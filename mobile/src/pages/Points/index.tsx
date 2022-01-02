import { Feather as Icon } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { RootStackParamList } from '../../../App';
import api from '../../services/api';
import { useRoute } from "@react-navigation/native";


        type ScreenNavigationProp<
        T extends keyof RootStackParamList
        > = StackNavigationProp<RootStackParamList, T>;

        type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
        RootStackParamList,
        T
        >;
        type Props<T extends keyof RootStackParamList> = {
        route: ScreenRouteProp<T>;
        navigation: ScreenNavigationProp<T>;
        };

interface Type{
  id:number;
  title: string;
  image_url: string;
  
}

interface Point{
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;

}

interface Params{
  uf: string;
  cidade:string;
}

export const Points:  React.FC<Props<'Home'>> = ({navigation}) =>{
  const [types, setTypes] = useState<Type[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])
  const [selectedTypes, setSelectedTypes] = useState<number[]>([])
  const route = useRoute()

  const routeParams = route.params as Params;

        function navigateToDetail(id: number){
         navigation.navigate('Detail', {point_id:id})
        }

        function handleSelectType(id: number){
          const alreadySelected = selectedTypes.findIndex(type => type ===id);
      
          if(alreadySelected>=0){
              const filteredTypes = selectedTypes.filter(type => type !== id);
                  setSelectedTypes(filteredTypes)
          }
          else{
              setSelectedTypes([ ...selectedTypes, id]);
          }
      }

    useEffect(()=>{
      async function loadPosition(){
        const { status } = await Location.requestForegroundPermissionsAsync()
          if(status !== 'granted'){
            Alert.alert('Ooooops...', 'Precisamos da sua permissão para obter a localização')
          return;
          }

          const location = await Location.getCurrentPositionAsync();

          const {latitude, longitude} = location.coords;
          console.log(latitude, longitude);
          setInitialPosition([
            latitude,
            longitude
          ])
      }
        loadPosition();
      
    }, []);

    useEffect(() =>{
    
        api.get('types').then(response=> {
          
          setTypes(response.data)
        })



    }, []);

    useEffect(()=>{
      api.get('points', {
        params:{
          cidade: 'Birigui',
          uf: 'SP',
          types: selectedTypes
        }
      }).then(response =>{
        setPoints(response.data);
      })

    }, [selectedTypes])

    return (
    <>
    <View style={styles.container}>
        
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Icon name="arrow-left" size={20} color="#272525"></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>Bem vindo(a).</Text>
        <Text style={styles.description}>Encontre no mapa uma vaga do seu interesse disponível.</Text>
         <View style={styles.mapContainer}>
            {initialPosition[0] !== 0 && (
                          <MapView 
                          style={styles.map} 
                         
                          initialRegion={{
                              latitude: initialPosition[0],
                              longitude:initialPosition[1],
                              latitudeDelta: 0.014,
                              longitudeDelta: 0.014,
                          }}>
              
                             {points.map(point => (
                                <Marker 
                                key={String(point.id)}
                                style={styles.mapMarker}
                                onPress={()=>navigateToDetail(point.id)}
                                coordinate={{
                                    latitude: point.latitude,
                                    longitude: point.longitude,
                                }}>
                                    <View style={styles.mapMarkerContainer}>
                                    <Image style={styles.mapMarkerImage}source = {{uri: point.image}} />
                                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                    </View>
                                </Marker>
                             ))}
                          </MapView>
            )}
        </View> 
        
    </View> 
   
        <View style={styles.itemsContainer}>
        <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:20 }}
        >

                {types.map(type =>(         
                
            <TouchableOpacity 
            key={String(type.id)} 
            style={[
              styles.item, 
              selectedTypes.includes(type.id)? styles.selectedTypes : {}]} 
            onPress={() =>handleSelectType(type.id) }
            activeOpacity={0.6}
            >
           
            <Text style={styles.itemTitle}>{type.title}</Text>
            </TouchableOpacity>))}

            </ScrollView>
   
        </View>
 
   </>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
    color: '#272525',
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#272525',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedTypes: {
      borderColor: '#272525',
      borderWidth: 2,
     
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Points;