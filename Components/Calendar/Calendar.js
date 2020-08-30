import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Calendar, Button } from '@ui-kitten/components';
import Events from './Events';
import AddEventModal from './AddEventModal';

export default function CalendarAndEvents(){
    const [showModal, setShowModal] = React.useState(false);

    return(
        <View style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <AddEventModal showModal = {showModal} setShowModal = {setShowModal} />
                <Button style={styles.addEventButton} onPress={() => setShowModal(!showModal)}>
                    <Text style={{color: "#33948F"}}>Add Event</Text>
                </Button>
                <Calendar style={styles.calenderViewProps}/>
                <View style={styles.eventsContainer}>
                    <Events />
                </View>
            </ScrollView>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#33948F",
    },
    innerContainer: {
        marginTop: 20,
        marginHorizontal: 15,
    },
    addEventButton: {
        width: width*.4,
        height: height*.05,
        alignSelf: "center",
        backgroundColor: "white",
        opacity: .78,
        margin: 15,
        borderRadius: 25
    },
    calenderViewProps:{
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 15,
    },
    eventsContainer: {

    }
})