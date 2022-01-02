import React, {useEffect, useState} from "react";
import { View, StyleSheet, TouchableOpacity, Linking, Text, ScrollView, Image, SafeAreaView } from "react-native";
import { Feather as Icon, FontAwesome} from '@expo/vector-icons'
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import {RouteProp} from '@react-navigation/core';
import {RectButton} from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";
import api from '../../services/api'
import * as MailComposer from 'expo-mail-composer'

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

interface Params {
  point_id: number
}
interface Data{
  point: {
    image:string
    name:string
    email:string
    whatsapp:string
    cidade:string
    uf:string
    
  }
  types: {
    title: string

  }[];
}
export const Detail:  React.FC<Props<'Detail'>> = ({navigation}) =>{
  const [data, setData] = useState<Data>({} as Data)

  const route = useRoute()
  const routeParams = route.params as Params;

useEffect(()=>{

  api.get(`points/${routeParams.point_id}`).then(response =>{
    setData(response.data)
  })
}, [])
    if(!data.point){
      return null;
    }

function composeMail(){
  MailComposer.composeAsync({
    subject: 'Duvidas sobre vagas',
    recipients: [data.point.email],

  })
}

function composeWpp(){
  Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Temho dúvidas sobre as vagas disponíveis`)
}
    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>

            <TouchableOpacity onPress={()=>navigation.navigate('Points')}>
                <Icon name="arrow-left" size={20} color="#272525"></Icon>
            </TouchableOpacity>
            <Image style={styles.pointImage} source={{uri: data.point.image}}/>
            <Text style={styles.pointName}>{data.point.name}</Text>
            <Text style={styles.pointItems}>{data.types.map(type=> type.title)}</Text>

            <View style={styles.address}></View>
            <Text style={styles.addressTitle} >Endereço</Text>
            <Text style={styles.addressContent}>{data.point.cidade}, {data.point.uf}</Text>

            <Text style={styles.vagasTitle}>Vagas Disponíveis</Text>
            <Text style={styles.addressContent}>12</Text>
        </View>

        <View style={styles.footer}>
            <RectButton style={styles.button} onPress={composeWpp}>
                <FontAwesome name="whatsapp" size={20} color="#FFF"/>
                <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>

                <RectButton style={styles.buttonmail} onPress={composeMail}>
                <Icon name="mail" size={20} color="#FFF"/>
                <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
        </View>
        </SafeAreaView>

) }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#272525',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
    vagasTitle: {
      paddingTop: 64,
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingBottom: 0,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonmail: {
        width: '48%',
        backgroundColor: '#36C2F1',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });

export default Detail;