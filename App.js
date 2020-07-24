import * as React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Components/HomeScreen';
import CalendarPage from './Components/Calendar';
import Today from './Components/Today';
import NewJournal from './Components/NewJournal';
import TodoForm from './Components/TodoForm.js'
import EventsPage from './Components/EventPage';
import MorePage from './Components/MorePage';
import AllJournals from './Components/AllJournals';
import AllEntriesPage from './Components/AllEntriesPage';
import {default as theme} from './custom-theme.json';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(){
    
    return(
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name = "Home" component = {HomeScreen}/>
                <Drawer.Screen name = "Today" component = {Today}/>
                <Drawer.Screen name = "Calendar" component = {CalendarPage}/>
                <Drawer.Screen name = "New Journal" component = {NewJournal}/>
                <Drawer.Screen name = "All Journals" component = {AllJournals}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </ApplicationProvider>
    );
}