import * as React from 'react';
import {StyleSheet, View, Text, TextInput, Modal, Dimensions } from 'react-native';
import { Button } from '@ui-kitten/components';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function AddEventModal(props){
    const [eventName, setEventName] = React.useState('');
    const [eventMonth, setEventMonth] = React.useState(0);
    const [eventDay, setEventDay] = React.useState(0);
    const [eventDescription, setEventDescription] = React.useState('');

    const addEvent = (name, month, day, description) => {
        if (name === null || name === "") {
            return null;
        }
  
          db.transaction(
            tx => {
              tx.executeSql("insert into allEvents (name, month, day, description) values (?, ?, ?, ?)", [name, month, day, description]);
            },
            null,
            props.forceUpdate
          );
    }

    return(
        <Modal visible={props.showModal} transparent={false}>
                <View style={styles.modal}>
                    <Button appearance='ghost' onPress={() => props.setShowModal(!props.showModal)} style={{alignSelf: 'flex-end'}}>CLOSE</Button>
                    <Text style={styles.inputLabel}>Event Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setEventName(text)}
                        placeholder="Name"
                        value={eventName}/>
                    <Text style={styles.inputLabel}>Event Date</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={num => setEventMonth(num)}
                            placeholder="MM"/>
                        <Text>/</Text>
                        <TextInput
                            style={[styles.input, {marginLeft: 15}]}
                            keyboardType="numeric"
                            onChangeText={num => setEventDay(num)}
                            placeholder="DD"/>
                    </View>
                    <Text style={styles.inputLabel}>Event Description</Text>
                    <TextInput
                        style={[styles.input, {paddingBottom: 100}]}
                        onChangeText={text => setEventDescription(text)}
                        placeholder="Description"
                        value={eventDescription}/>
                    <Button
                        style={styles.button}
                        onPress={() => {
                            addEvent(eventName, eventMonth, eventDay, eventDescription);
                            setEventName(null);
                            setEventMonth(null);
                            setEventDay(null);
                            setEventDescription(null);
                            props.setShowModal(!props.showModal);}}>
                                ADD
                            </Button>
                </View>
            </Modal>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    modal: {
        alignSelf: 'center',
        marginVertical: height*.1,
        width: width*.75,
    },
    inputLabel: {
        marginTop: 15,
        fontSize: 10,
        color: 'grey',
    },
    input: {
        padding: 5,
        marginTop: 5,
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
})