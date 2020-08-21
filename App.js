import * as React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Components/HomeScreen';
import Today from './Components/Today';
import NewJournal from './Components/NewJournal';
import TodoForm from './Components/TodoForm.js'
import Events from './Components/Events';
import AllJournals from './Components/AllJournals';
import AllEntries from './Components/AllEntries';
import {default as theme} from './custom-theme.json';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(){
    
    return(
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <NavigationContainer >
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name = "Today" component = {Today}/>
                <Drawer.Screen name = "New Journal" component = {NewJournal}/>
                <Drawer.Screen name = "All Journals" component = {AllJournals}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </ApplicationProvider>
    );
}