import React from 'react';
import {View, TextInput, StyleSheet, Modal, ScrollView, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Fab, Icon} from 'native-base';
import {Button} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db')

function DisplayEvents() {
    const [eventsList, setEventsList] = React.useState(null);

    React.useEffect(() => {
        db.transaction(tx => {
            //add conditional statement
            tx.executeSql(
                //displays everything for now
                "SELECT * FROM events;", [], (_, {rows: {_array}}) => setEventsList(_array)
            );
        });
        return () => setEventsList(null);
    });

    if (eventsList === null || eventsList.length === 0){
        var height = (Dimensions.get('window').height)/5;

        return(
            <View>
                <Text style={{textAlign: 'center', marginTop: height, fontSize: 20}}>You're free today!</Text>
            </View>
        );
    }

    return(
        <View style={styles.listArea}>
            {eventsList.map(({id, name}) => (
                <View
                    key={id}>
                    <Text style={styles.eventName}>{name}</Text>
                </View>
            ))}
        </View>
    )
}

function getDayNum(){
    const date = new Date();
    const dayNum = date.getDay();
    return dayNum;
}

function getDayOfWeek(dayNum){
    let day;
    if (dayNum > 6){
        dayNum = dayNum % 7;
    }

    switch(dayNum){
        case 1: 
            day = "Monday";
            break;
        case 2: 
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5: 
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 0:
            day = "Sunday";
            break;
    }
    return day;
}

export default function EventsPage(){
    const [showModal, setShowModal] = React.useState(false);
    const [eventName, setEventName] = React.useState('');
    const [eventDescription, setEventDescription] = React.useState('');
    const [eventMonth, setEventMonth] = React.useState('');
    const [eventDay, setEventDay] = React.useState('');
    const [forceUpdate, forceUpdateId] = useForceUpdate();

    //creates table that stores all the events (name, date (month, day), description)
    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE if not exists events (id integer primary key not null auto_increment, name text, month integer, day integer, description text);"
            );
        });
    }, []);

    const addName = (input) => {
        // is text empty?
        if (input === null || input === "") {
          return null;
        }

        db.transaction(
          tx => {
            tx.executeSql("INSERT INTO events (name) VALUES (?)", [input]);
          },
          null,
          forceUpdate
        ); 
        };

      const addMonth = (input) => {
        // is text empty?
        if (input === null) {
          return null;
        }
    
        db.transaction(
          tx => {
            tx.executeSql("INSERT INTO events (month) VALUES (?)", [input]);
          },
          null, 
          forceUpdate
        );
        }

      const addDay = (input) => {
        // is text empty?
        if (input === null || input === "") {
          return null;
        }
    
        db.transaction(
          tx => {
            tx.executeSql("INSERT INTO events (day) VALUES (?)", [input]);
          },
          null,
          forceUpdate
        );
        }

    const addDescription = (input) => {
        db.transaction(
          tx => {
            tx.executeSql("INSERT INTO events (description) VALUES (?)", [input]);
          },
          null,
          forceUpdate
        );
    };

    const dayNum = getDayNum();
    /*
    const today = new Date();
    const currentMonth = today.getMonth();
      */

    return(
        <View style = {styles.container}>
            <ScrollView horizontal={true}>
                <View style={styles.PageContainer}>
                    <Text style={styles.PageHeading}>{getDayOfWeek(dayNum)}</Text>
                    <DisplayEvents 
                        key={`event-${forceUpdateId}`}/>
                </View>
                <View style={styles.PageContainer}>
                    <Text style={styles.PageHeading}>{getDayOfWeek(dayNum + 1)}</Text>
                </View>
                <View style={styles.PageContainer}>
                    <Text style={styles.PageHeading}>{getDayOfWeek(dayNum + 2)}</Text>
                </View>
                <View style={styles.PageContainer}>
                    <Text style={styles.PageHeading}>{getDayOfWeek(dayNum + 3)}</Text>
                </View>
                <View style={styles.PageContainer}>
                    <Text style={styles.PageHeading}>{getDayOfWeek(dayNum + 4)}</Text>
                </View>
                <View style={styles.PageContainer}>
                    <Text style={styles.PageHeading}>{getDayOfWeek(dayNum + 5)}</Text>
                </View>
                <View style={styles.PageContainer}>
                    <Text style={styles.PageHeading}>{getDayOfWeek(dayNum + 6)}</Text>
                </View>
            </ScrollView>
            <Fab onPress={() => setShowModal(!showModal)} >
                <Icon name="add"/>
            </Fab>
            <Modal style={styles.ModalContainer} visible={showModal} transparent={false}>
                <TextInput 
                style={{marginTop: 100, textAlign: 'center', fontSize: 30, borderColor: 'black', borderWidth: 1, marginHorizontal: 50}}
                onChangeText={input => setEventName(input)}
                placeholder="New Event"/>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                    style={{marginTop: 25, marginLeft: 120, marginRight: 15, fontSize: 20, paddingRight: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={input => setEventMonth(input)}
                    placeholder="1"/>
                    <TextInput
                    style={{marginTop: 25, paddingRight: 40, fontSize: 20, borderColor: 'black', borderWidth: 1}}
                    onChangeText={input => {setEventDay(input)}}
                    placeholder="1"/>
                </View>
                <TextInput
                style={{margin: 25, fontSize: 20, paddingBottom: 75, borderColor: 'black', borderWidth: 1}}
                onChangeText={input => {setEventDescription(input)}}
                placeholder="Tap here to continue..."/>
                <Button style={{width: 120, alignSelf: 'center'}} title="Add Event" onPress={() => {
                    addName(eventName);
                    addMonth(eventMonth);
                    addDay(eventDay);
                    setEventName(null);
                    setEventMonth(null);
                    setEventDay(null);
                    if (eventDescription != '' || eventDescription != null){
                        addDescription(eventDescription);
                    };
                    setShowModal(!showModal);
                }}/>
            </Modal>
        </View>
    )
}

function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    return [() => setValue(value + 1), value];
  }
  
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    PageContainer: {
        flex: 1,
        margin: 15,
        width: width - 30,
        borderColor: 'black',
        borderWidth: 1,
    },
    PageHeading: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    listArea: {
        margin: 50,
        borderWidth: 1,
        borderColor: 'black',
    },
    eventName: {
        fontSize: 18,
    },
    ModalContainer: {
        marginTop: 50,
    }

})