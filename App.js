import * as React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {default as theme} from './custom-theme.json';
import Today from './Components/Today/Today';
import NewJournal from './Components/Journal/NewJournal';
import AllJournals from './Components/Journal/AllJournals';
import Calendar from './Components/Calendar/Calendar';
import Home from './Components/Home'

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component{
    
    render(){
        return(
            <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
            <NavigationContainer >
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name = "Today" component = {Today}/>
                    <Drawer.Screen name = "Calendar" component = {Calendar}/>
                    <Drawer.Screen name = "New Journal" component = {NewJournal}/>
                    <Drawer.Screen name = "All Journals" component = {AllJournals}/>
                </Drawer.Navigator>
            </NavigationContainer>
            </ApplicationProvider>
        );
    }
}