import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
//import {Button} from 'react-native-elements';
import { List, ListItem, Icon, Button } from '@ui-kitten/components';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

//Create a function component that creates a button to display each journal 

export default function allJournals({navigation}){
    let allJournalsArray = [{title: "All Entries", page: "All Entries"}];

    const renderItem = ({ item }) => (
        <Button size = "giant" appearance="ghost" onPress={() => navigation.navigate('All Entries')}>
            {item.title}
        </Button>
    );

    const renderIcon = (props) => (
        <Icon {...props} 
            name='arrow-ios-forward-outline'
        />
    );

    return(
        <View style={styles.container}>
            <View style={styles.page}>
                <Button style={styles.button} onPress={() => navigation.navigate('New Journal')}>NEW JOURNAL</Button> 
                <List 
                    data={allJournalsArray}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                    accessoryRight={renderIcon}
                    />
            </View>
        </View>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    button: {
        marginTop: height*.02,
        height: height*.07,
        width: width*.4,
        backgroundColor: "#33948F",
        alignSelf: 'center',
        marginBottom: 15,
        borderRadius: 25
    },
})