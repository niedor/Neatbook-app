import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal} from 'react-native';
import {Fab, Icon} from 'native-base';
import {Button} from 'react-native-elements';
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('TodoDatabase');

function Items({done: doneHeading, onPressItem}) {
    const [items, setItems] = React.useState(null);
    const heading = doneHeading ? 'Completed' : 'To do';

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Todo WHERE done = ?;", [doneHeading ? 1 : 0], (_, {rows: {_array}}) => setItems(_array)
            );
        });
    }, []);

    if (items === null || items.length === 0){
        return null;
    }

    return (
        <View>
            <Text>{heading}</Text>
            {items.map(({ id, tasks, done}) => (
                <TouchableOpacity
                    key={id}
                    onPress={() => onPressItem && onPressItem(id)}
                    style={{
                        borderColor: "#000",
                        borderWidth: 1,
                        padding: 8
                    }}>
                    <Text>{tasks}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default function TodoForm(){
    const [textInput, setTextInput] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [forceUpdate, forceUpdateId] = useForceUpdate();

    React.useEffect(() => {
    db.transaction(
        tx => {
            tx.executeSql("CREATE TABLE if not exists Todo (id int primary key not null, tasks string, done int);");
        }
    )
    });

    const typingHandler = (value) => {
        setTextInput(value);
    }

    const add = (text) => {
        if (text === null || text === ""){
            return false;
        }

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO Todo (tasks, done) VALUES (?, 0);", [textInput]);
                tx.executeSql("select * from items", 
                [], 
                (_, { rows }) => console.log(JSON.stringify(rows)));
            }, null, forceUpdate
        );
    }


        return(
            <View style={styles.container}>
                <ScrollView>
                    <Items
                        key={`forceupdate-todo-${forceUpdateId}`}
                        done={false}
                        onPressItem={id =>
                            db.transaction(
                            tx => {
                                tx.executeSql(`update todo set done = 1 where id = ?;`, [
                                id
                                ]);
                            },
                            null,
                            forceUpdate
                            )
                        }
                    />
                    <Items
                        done
                        key={`forceupdate-done-${forceUpdateId}`}
                        onPressItem={id =>
                            db.transaction(
                            tx => {
                                tx.executeSql(`delete from items where id = ?;`, [id]);
                            },
                            null,
                            forceUpdate
                            )
                        }
                    />
                </ScrollView>
                <Fab onPress = {() => setIsModal(!isModal)}>
                    <Icon name = "add"/>
                </Fab>
                <Modal transparent = {true} visible = {isModal}>
                    <View style = {styles.modalContainer}>
                        <Button onPress = {() => setIsModal(!isModal)} style={{width: 20, alignContent: 'right'}}>
                            <Icon name = "clear"/>
                        </Button>
                        <Text style={styles.modalHeader}>Add Task</Text>
                        <TextInput  
                        onChangeText = {typingHandler}
                        onSubmitEditing = {() => {
                            add(textInput);
                            setTextInput(null);
                        }}
                        style = {{marginHorizontal: 20, fontSize: 18}}
                        clearTextOnFocus = {true}
                        multiline = {true}
                        placeholder = 'Type here to continue...'
                        placeholderTextColor = '#BCC6CC'
                        />
                        <Button onPress = {() => {setIsModal(!isModal)}} title = "Submit" style={{width: 80, alignSelf: 'center', marginTop: 100}}/>
                    </View>
                </Modal>
            </View>
        )
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}

//to display our submitted todos
const Todo = todo => {
    return (
        <View 
          style={{ backgroundColor: "#eaeaea", width: 300, margin: 5 }}>
          <Text>{todo.text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    modalContainer: {
        backgroundColor: '#EBF4FA',
        marginVertical: 120,
        marginHorizontal: 50,
        height: 250,
    }, 

    modalHeader: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Arial'
    },

  });