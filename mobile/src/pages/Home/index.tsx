import React, {useState} from "react";
import { AntDesign } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet } from "react-native";
import {RectButton, TextInput} from 'react-native-gesture-handler'
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import {RouteProp} from '@react-navigation/core';


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


export const Home: React.FC<Props<'Home'>> = ({navigation}) => {
  const [uf, setUf] = useState('')
  const [cidade, setCidade] = useState('')
  
  function navigateToPoints(){
    navigation.navigate('Points'), {
      uf,
      cidade,
    }
  }

    return (
    <ImageBackground 
    source={require('../../assets/home-background.png')} 
    style={styles.container} 
    imageStyle={{ width:274, height: 333 }}
   

    >
      
      <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <Text style={styles.title}>O seu aplicativo de vagas eficiente.</Text>
          <Text style={styles.description}>Ajudamos você a encontrar uma vaga sem espera!</Text>


      </View>

      <View style={styles.footer}>
        <TextInput 
          style={styles.input}
          placeholder="Digite o Estado"
          value={uf}
          maxLength={2}
          autoCapitalize="characters"
          autoCorrect={false}
          onChangeText={setUf}
        />
            <TextInput 
          style={styles.input}
          placeholder="Digite a Cidade"
          value={cidade}
          autoCorrect={false}
          onChangeText={setCidade}
        />

          <RectButton style={styles.button} onPress={navigateToPoints}>
            <View style={styles.buttonIcon}>
            <AntDesign name="enviromento" size={32} color="#EDEAEA" />
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
      </View>
    </ImageBackground>);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,

    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#272525',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 96,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#BBB9B9',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });


