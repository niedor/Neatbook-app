import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { List, ListItem, Icon, Button } from '@ui-kitten/components';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

function DisplayJournals(){
    const [journals, setJournals] = React.useState(null);

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM JournalsTable", [], (_, {rows: {_array}}) => setJournals(_array)
            )
        })
    });

    if (journals === null || journals.length === 0){
        return(
            <View>
                <Text style={styles.nullMessage}>Write your first journal entry today!</Text>
            </View>
        )
    }

    return(
        <View>
            {journals.map(({id, entry, year, month, day}) => {
                    <TouchableOpacity key={id}>
                        <Text>{entry}</Text>
                        <Text>{`${month} ${day}, ${year}`}</Text>
                    </TouchableOpacity>
            })}
        </View>
    )
}

export default function AllJournals({navigation}){

    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.header}>All Journals</Text>
                <Button onPress={() => navigation.navigate("New Journal")}>
                    Add Entry
                </Button>
                <DisplayJournals />
            </View>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#33948F"
    },
    innerContainer:{
        backgroundColor: "#D4E9E7",
        borderRadius: 15,
        width: width*.8,
        height: height*.8,
        alignSelf: 'center',
        marginTop: height*.1
    },
    header:{
        fontSize: 25,
        textAlign: 'center',
        margin: 15,
    },
    nullMessage:{
        color: 'grey',
        textAlign: 'center',
        fontSize: 20,
        marginTop: height*.2,
        marginHorizontal: 15,
        flexWrap: 'wrap'
    }
})