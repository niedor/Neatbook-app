import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button, Divider} from '@ui-kitten/components';
import TodoForm from './TodoForm';
import EventPage from './EventPage';

//ANOTHER THING TO ADD TO THIS APP: SET REMINDERS FOR MONTHLY/WEEKLY THINGS. EXAMPLE: CHECK BANK STATEMENT, WALK DOG AT A CERTAIN TIME, STRETCH AT A CERTAIN TIME, READ AT A CERTAIN TIME 

export default function Today({navigation}){
    let greeting;
    let subGreeting;
    let timeOfDay = new Date().getHours();

    //eventually have a list of different greetings to choose from
    if (timeOfDay < 12){
        greeting = "Good Morning!";
        subGreeting = "Let's make today a productive one..";
    } else if (timeOfDay >= 12 && timeOfDay < 17) {
        greeting = "Good Afternoon!";
        subGreeting = "What do you have to do today?";
    } else {
        greeting = "Good Evening";
        subGreeting = "It's never too late to get things done!";
    }
    
    const menuIcon = () => (
        <Icon name='menu' />
    )

    return(
        <ScrollView style={styles.container}>
            <Button style={styles.menuButton} appearance='ghost' accessoryLeft={menuIcon}
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}/>
            <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style = {[styles.greeting, {fontSize: 20, marginTop: 12,}]}>{subGreeting}</Text>
            </View>
            <View>
                <TodoForm/>
            </View>
            <Text style = {[styles.greeting, {marginVertical: 30}]}>7-Day Overview</Text>
            <View>
                <EventPage />
            </View>
        </ScrollView>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    greetingContainer: {    
        marginHorizontal: 15,
        marginVertical: 20,
        height: height*.12
    },
    greeting: {
        fontFamily: 'gafata-regular',
        fontSize: 40,
        textAlign: 'center'
    },
    menuButton: {
        alignSelf: 'flex-start',
        marginHorizontal: 10,
    }
});
