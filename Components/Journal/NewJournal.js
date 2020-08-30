import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Modal, Dimensions } from 'react-native';
import { Button } from '@ui-kitten/components';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function NewJournal({navigation}){
    const [showModal, setShowModal] = React.useState(false);
    const [entry, setEntry] = React.useState('');
    const [forceUpdate, forceUpdateId] = useForceUpdate();

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE if not exists JournalsTable (id integer primary key not null, entry text, year int, month int, day int);"
            );
        });
    }, []);

    const add = (entry) => {
        if (entry === null || entry === ('')){
            return null;
        }

        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDate();
        //add time

        db.transaction(
            tx => {
              tx.executeSql("INSERT INTO JournalsTable (entry, year, month, day) VALUES (?, ?, ?, ?)", [entry, year, month, day], console.log("A row has been inserted into 'journals'"));
            },
            null,
            forceUpdate
        );
    };

    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.question}>What's on your mind today?</Text>
                <ScrollView>
                    <TextInput
                        onChangeText={text => setEntry(text)}
                        style={styles.textInput}
                        multiline={true}
                        placeholder={"Tap to continue..."}
                        value={entry}
                        />
                    <Button style={styles.button} onPress={() => {
                        add(entry);
                        setEntry(null);
                        setShowModal(!showModal)}}>
                            SAVE
                    </Button>
                </ScrollView>
                <Modal visible = {showModal} transparent={true}>
                    <View style = {styles.modal}>
                        <Text style={styles.modalText}>
                            Your entry has been saved. 
                        </Text>
                        <Button style = {styles.modalButton} onPress={() => {
                            setShowModal(!showModal);
                            navigation.navigate('All Journals');
                            }}>
                                CONTINUE
                            </Button>
                    </View>
                </Modal>
            </View>
        </View>
    )
} 

function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    return [() => setValue(value + 1), value];
  }

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#D4E9E7"
    },
    innerContainer:{
        marginTop: 60,
    },
    question:{
        color: 'grey',
        alignSelf: 'center', 
        fontSize: 20
    },
    textInput:{
        fontSize: 18,
        marginVertical: 30,
        height: height*.5,
        padding: 20,
        paddingTop: 20,
        borderRadius: 25,
        backgroundColor: "white",
        opacity: .84,
        margin: 30,
    },
    button:{
        width: width*.25,
        borderRadius: 25,
        alignSelf: 'center'
    },
    modal:{
        alignSelf: 'center',
        marginTop: height*.25,
        height: height*.25,
        width: width*.75,
        backgroundColor: 'white',
    },
    modalButton:{
        marginTop: 40,
        width: width*.4,
        alignSelf: 'center',
    },
    modalText:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 40,
    } 
})


