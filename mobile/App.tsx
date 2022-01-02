import React from 'react';
import  AppLoading  from 'expo-app-loading'
import { StatusBar, View } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {Home} from "./src/pages/Home";
import Points from "./src/pages/Points";
import Detail from "./src/pages/Detail";

export type RootStackParamList = {
  Home: undefined;
  Points: undefined;
  Detail: undefined;
};
const AppStack = createStackNavigator<RootStackParamList>();
const App: React.FC<RootStackParamList> = () =>{  
  
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_500Medium,
    Ubuntu_700Bold
  });
  if (!fontsLoaded){
    return <AppLoading />
  }
  return(
      <NavigationContainer >
          <AppStack.Navigator 
          screenOptions={{
                  headerShown: false,
}}>    
              <AppStack.Screen name="Home" component={Home}/>
              <AppStack.Screen name="Points" component={Points}/>
              <AppStack.Screen name="Detail" component={Detail}/>
          </AppStack.Navigator>
      </NavigationContainer>
  )
} 
export default App;