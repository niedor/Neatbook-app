import * as React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {default as theme} from './custom-theme.json';
import Today from './Components/Today';
import NewJournal from './Components/NewJournal';
import AllJournals from './Components/AllJournals';

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component{
    
    render(){
        return(
            <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
            <NavigationContainer >
                <Drawer.Navigator initialRouteName="Today">
                    <Drawer.Screen name = "Today" component = {Today}/>
                    <Drawer.Screen name = "New Journal" component = {NewJournal}/>
                    <Drawer.Screen name = "All Journals" component = {AllJournals}/>
                </Drawer.Navigator>
            </NavigationContainer>
            </ApplicationProvider>
        );
    }
}