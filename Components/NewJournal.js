import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Modal, Dimensions} from 'react-native';
import { Button } from '@ui-kitten/components';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

//this is just a test
function DisplayEntries(){
    const [allJournals, setAllJournals] = React.useState('');

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM journals`,
                [],
                ({ rows: { _array }}) => setAllJournals(_array) 
            );
        });
    })

    if (allJournals === null || allJournals === ''){
        return(
            <View>
                <Text>Make your first entry!</Text>
            </View>
        )
    }

    return(
        <ScrollView>
            <View>
                {allJournals.map(({id, entry}) => (
                    <View
                        key={id}>
                        <Text>{entry}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default function NewJournal({navigation}){
    const [showModal, setShowModal] = React.useState(false);
    const [entry, setEntry] = React.useState('');
    const [forceUpdate, forceUpdateId] = useForceUpdate();

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE if not exists journals (id integer primary key not null, entry text, year int, month int, day int);"
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
        //add time later

        db.transaction(
            tx => {
              tx.executeSql("INSERT INTO journals (entry, year, month, day) values (?, ?, ?, ?)", [entry, year, month, day], console.log("A row has been inserted into 'journals'"));
            },
            null,
            forceUpdate
        );
    };

    return(
        <View style={styles.container}>
            <TextInput
                onChangeText={text => setEntry(text)}
                style={styles.body}
                multiline={true}
                placeholder={"What's on your mind?"}
                value={entry}
                />
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Button style={styles.button} onPress={() => {
                    add(entry);
                    setEntry(null);
                    setShowModal(!showModal)}}>
                        SAVE
                    </Button>
            </View>
            <DisplayEntries 
                key={`journal-${forceUpdateId}`}/>
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
        backgroundColor: "white"
    },
    header:{
        fontSize: 26,
    },
    body:{
        fontSize: 18,
        marginVertical: 20,
        //height: height*.4,
        padding: 10,
        paddingTop: 15,
        borderRadius: 25,
        backgroundColor: "rgba(51, 148, 143, 0.16)",
        margin: 30,
    },
    button:{
        width: width*.25,
        borderRadius: 25,
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


