import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Button } from '@ui-kitten/components';
import { Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import getMonthText from '../getMonthText';

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
        <ScrollView>
            {journals.reverse().map(({ id, entry, year, month, day }) => (
                    <TouchableOpacity key={id} style={styles.journalEntryContainer}>
                        <Text style={styles.journalEntryDate}>{`${getMonthText(month)} ${day}, ${year}`}</Text>
                        <Text>{entry}</Text>
                    </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default function AllJournals({navigation}){
    const addIcon = () => (
        <Icon name="add" color="#33948F"/>
    );

    const menuIcon = () => (
        <Icon name='menu' />
    )

    return(
        <View style={styles.container}>
            <Button style={styles.menuButton} appearance='ghost' accessoryLeft={menuIcon}
                        onPress={() => {
                            navigation.toggleDrawer();
            }}/>
            <View style={styles.innerContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.header}>All Entries</Text>
                    <Button appearance = "ghost" onPress={() => navigation.navigate("Create New Journal")} accessoryRight = {addIcon} style={{marginLeft: width*.1, marginTop: 10}}/>
                </View>
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
    menuButton: {
        alignSelf: 'flex-start',
        marginVertical: 15,
        marginHorizontal: 10
    },
    innerContainer:{
        backgroundColor: "#D4E9E7",
        borderRadius: 15,
        width: width*.85,
        height: height*.82,
        alignSelf: 'center',
    },
    header:{
        fontSize: 25,
        marginLeft: width*.275,
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10,
        color: "#33948F"
    },
    nullMessage:{
        color: "grey",
        textAlign: "center",
        fontSize: 20,
        marginTop: height*.2,
        marginHorizontal: 15,
        flexWrap: "wrap"
    },
    journalEntryContainer: {
        marginVertical: 10,
        marginHorizontal: 25,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10
    },
    journalEntryDate: {
        color: "grey",
        marginBottom: 5
    }
})