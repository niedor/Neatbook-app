import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Calendar, Button } from '@ui-kitten/components';
import Events from './Events';
import AddEventModal from './AddEventModal';
import { Icon } from 'react-native-elements';

export default function CalendarAndEvents({ navigation }){
    const [showModal, setShowModal] = React.useState(false);
    const menuIcon = () => (
        <Icon name='menu' />
    )

    return(
        <View style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <AddEventModal showModal = {showModal} setShowModal = {setShowModal} />
                <View style={{flexDirection: 'row'}}>
                    <Button style={styles.menuButton} appearance='ghost' accessoryLeft={menuIcon}
                            onPress={() => {
                                navigation.toggleDrawer();
                            }}/>
                    <Button style={styles.addEventButton} onPress={() => setShowModal(!showModal)}>
                        <Text style={{color: "#33948F"}}>Add Event</Text>
                    </Button>
                </View>
                <Calendar style={styles.calenderViewProps}/>
                <View style={styles.eventsContainer}>
                    <Events setShowModal = {setShowModal}/>
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
        marginLeft: 50,
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