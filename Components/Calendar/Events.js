import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ScrollView } from 'react-native-gesture-handler';
import getMonthText from '../getMonthText';

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
        return(
            <View style={[styles.listArea, {paddingBottom: 294}]}>
                <Text style={styles.nullMessage}>You're free today!</Text>
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

function DisplayDateAndEvents(props){
    let weeklyEvents = [];
    let currentMonth = props.currentMonth;
    let currentDay = props.currentDay;
    let dayNum = props.dayNum;
    let getDayOfWeek = props.getDayOfWeek;

    for (let i = 1; i < 7; i++){
        let dayOfWeek = getDayOfWeek(dayNum + i);
        let month = props.getDate(currentMonth, currentDay + i)[0];
        let day = props.getDate(currentMonth, currentDay + i)[1];

        singleDay = (
            <View style={styles.dayContainer} key={i}>
                <Text style={styles.dayHeading}>{`${dayOfWeek}, ${getMonthText(month - 1)} ${day}`}</Text>
                <DisplayEvents
                        key={`event-${props.forceUpdateId}`}
                        month={month}
                        day={day}/>
            </View>
        );
        weeklyEvents[i] = singleDay;
    }

    return(
        <ScrollView horizontal={true}>
            {weeklyEvents}
        </ScrollView>
    )
}

export default function Events(props){

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE if not exists allEvents (id integer primary key not null, name text, month int, day int, description text);"
            );
        });
    }, []);

    function getDayNum(){
        const date = new Date();
        const dayNum = date.getDay();
        return dayNum;
    }
    const dayNum = getDayNum();
    
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
            <ScrollView horizontal={true} style={{marginVertical: height*.02}}>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{`Today, ${getMonthText(getDate(currentMonth, currentDay)[0] - 1)} ${getDate(currentMonth, currentDay)[1]}`}</Text>
                    <DisplayEvents 
                            key={`event-${props.forceUpdateId}`}
                            month={getDate(currentMonth, currentDay)[0]}
                            day={getDate(currentMonth, currentDay)[1]}/>
                </View>
                <DisplayDateAndEvents 
                    getDate = {getDate} 
                    currentMonth = {currentMonth}
                    currentDay = {currentDay}
                    forceUpdateId = {props.forceUpdateId} 
                    getDayOfWeek = {getDayOfWeek}
                    dayNum = {dayNum}/>
            </ScrollView>
        </View>
    )
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
        width: width*.8,
        marginVertical: 5
    },
    eventTextContainer:{
        alignContent: 'center',
        marginVertical: 8,
        marginLeft: 20,
    },
    eventName: {
        fontSize: 16,
        marginBottom: -2
    },
    eventDescription: {
        fontSize: 13,
        color: 'grey',
    },
    nullMessage: {
        textAlign: 'center', 
        fontSize: 18, 
        marginTop: height*.1, 
        color: "white",
        opacity: .74
    }
})