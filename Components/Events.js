import React from 'react';
import { View, TextInput, StyleSheet, Dimensions, Modal, Text } from 'react-native';
import { Button } from '@ui-kitten/components';
import * as SQLite from 'expo-sqlite';
import { Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import getMonthText from './getMonthText';

const db = SQLite.openDatabase('db.db');

function DisplayEvents({month, day}){
    const [listOfEvents, setList] = React.useState(null);

    React.useEffect(() => {
        db.transaction(tx => {
          tx.executeSql(
            "SELECT * FROM allEvents WHERE month = ? and day = ?;",
            [month, day],
            (_, { rows: { _array } }) => setList(_array)
          );
        });
    }, []);

    if (listOfEvents === null || listOfEvents.length === 0){
        const height = Dimensions.get('window').height;

        return(
            <View style={[styles.listArea, {paddingBottom: 294}]}>
                <Text style={{textAlign: 'center', fontSize: 20, marginTop: height*.1, color: "#33948F"}}>You're free today!</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.listArea}>
            <View style={{margin: 20}}>
                {listOfEvents.map(({id, name, description}) => ( //implicit return when using parentheses instead of brackets
                        <View 
                            key={id}
                            style={styles.singleEventContainer}>
                            <View style={styles.eventTextContainer}>
                                <Text style={[styles.eventName, {paddingBottom: 3}]}>{name}</Text>
                                <Text style={styles.eventDescription}>{description}</Text>
                            </View>
                        </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default function Events(){
    const [eventName, setEventName] = React.useState('');
    const [eventMonth, setEventMonth] = React.useState(0);
    const [eventDay, setEventDay] = React.useState(0);
    const [eventDescription, setEventDescription] = React.useState('');

    const [showModal, setShowModal] = React.useState(false);
    const [forceUpdate, forceUpdateId] = useForceUpdate();

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

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE if not exists allEvents (id integer primary key not null, name text, month int, day int, description text);"
            );
        });
    }, []);

    const add = (name, month, day, description) => {
        if (name === null || name === "") {
            return null;
        }
  
          db.transaction(
            tx => {
              tx.executeSql("insert into allEvents (name, month, day, description) values (?, ?, ?, ?)", [name, month, day, description]);
            },
            null,
            forceUpdate
          );
    }
    
    const dayNum = getDayNum();

    function getDate(month, day){ //HAVE NOT taken into account leap years
        if (month === 2){
            if (day > 28){
                month++;
                day = 1;
            }
        } else if (month === 4 || month === 6 || month === 9 || month === 11){
            if (day > 30){
                month++;
                day = 1;
            }
        } else {
            if (day > 31){
                month++;
                day = 1;
            }
        }
        return [month, day];
    }

    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;

    return(
        <View style={styles.container}>
            <Modal visible={showModal} transparent={false}>
                <View style={styles.modal}>
                    <Button appearance='ghost' onPress={() => setShowModal(!showModal)} style={{alignSelf: 'flex-end'}}>CLOSE</Button>
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
                            add(eventName, eventMonth, eventDay, eventDescription);
                            setEventName(null);
                            setEventMonth(null);
                            setEventDay(null);
                            setEventDescription(null);
                            setShowModal(!showModal);}}>
                                ADD
                            </Button>
                </View>
            </Modal>
            <ScrollView horizontal={true} style={{marginVertical: height*.02}}>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{`Today, ${getMonthText(getDate(currentMonth, currentDay)[0] - 1)} ${getDate(currentMonth, currentDay)[1]}`}</Text>
                    <DisplayEvents 
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay)[0]}
                            day={getDate(currentMonth, currentDay)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 1)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 1)[0]}
                            day={getDate(currentMonth, currentDay + 1)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 2)}</Text>
                    <DisplayEvents 
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 2)[0]}
                            day={getDate(currentMonth, currentDay + 2)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 3)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 3)[0]}
                            day={getDate(currentMonth, currentDay + 3)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 4)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 4)[0]}
                            day={getDate(currentMonth, currentDay + 4)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 5)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 5)[0]}
                            day={getDate(currentMonth, currentDay + 5)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 6)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 6)[0]}
                            day={getDate(currentMonth, currentDay + 6)[1]}/>
                </View>
            </ScrollView>
            <Button 
                style={styles.button}
                onPress={() => {
                    setShowModal(!showModal);
                }}>
                    ADD EVENT
            </Button>
        </View>
    )
}

function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    return [() => setValue(value + 1), value];
  }

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dayContainer: {
        flex: 1,
        width: width*.9,
        height: height*.65,
        backgroundColor: "rgba(51, 148, 143, 0.16)",
    },
    dayHeading: {
        color: "#D4E9E7",
        textAlign: "center",
        fontSize: 20,
        marginTop: 30,
    },
    singleEventContainer:{
        backgroundColor: "white", 
        opacity: .74,
        borderRadius: 20,
        height: height*.08,
        width: width*.8
    },
    eventTextContainer:{
        margin: 10,
        marginLeft: 20,
    },
    eventName: {
        fontSize: 18,
    },
    eventDescription: {
        fontSize: 15,
        color: 'grey',
    },
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
    button: {
        marginTop: height*.03,
        height: height*.07,
        width: width*.4,
        alignSelf: 'center',
        borderRadius: 25,
    }
})