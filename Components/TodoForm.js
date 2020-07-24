import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { Button } from '@ui-kitten/components';

//This is a long-term to do list as of now. Might consider adjusting it so that the list clears everyday and any incompleted
//tasks are saved in another file.

const db = SQLite.openDatabase("db.db");

const low = "#F8D763";
const medium = "#EAA800";
const high = "#875500";

function Items({ done: doneHeading, onPressItem }) { //this way of declaring props is known as JS object destructuring
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      {items.map(({ id, done, value, priority }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#33948F" : "#fff",
            padding: 8,
            marginVertical: 6,
            borderRadius: 12,
          }}>
          <Text style={{ color: done ? "white" : "#000", fontSize: 15}}>{value}</Text>
          <Text style={{ color: priority ? medium : low }}>PRIORITY LEVEL</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  const [text, setText] = React.useState(null);
  const [priority, setPriority] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [addModal, setAddModal] = React.useState(false);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text, priority int);"
      );
    });
  }, []);

  const add = (text, priority) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("insert into items (done, value, priority) values (0, ?, ?)", [text, priority]);
        tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  }

const low = "#F8D763";
const medium = "#EAA800";
const high = "#875500";

const addIcon = () => (
  <Icon name="add" style={{color: "#33948F"}}/>
);

  return (
    <View style={styles.container}>
    <Modal transparent = {false} visible = {addModal}>
      <View style = {styles.modalContainer}>
        <Text style={styles.modalHeading}>What do you need to do today?</Text>
        <TextInput
          onChangeText={text => setText(text)}
          onSubmitEditing={() => {
            add(text);
            setText(null);
            setAddModal(!addModal);
          }}
          placeholder="Tap here to continue..."
          style={styles.input}
          value={text}
        />
        <View style={{flexDirection:'row'}}>
          <Text style={styles.priorityLabel}>Choose a priority level: </Text>
          <View>
            <Button size="tiny" style={[styles.priorityButton, {backgroundColor: low}]} 
                onPress={() => {
                  setPriority(0);
                }}>Low</Button>
            <Button size="tiny" style={[styles.priorityButton, {backgroundColor: medium}]}
                onPress={() => {
                  setPriority(1);
                }}>Medium</Button>
            <Button size="tiny" style={[styles.priorityButton, {backgroundColor: high}]}
                onPress={() => {
                  setPriority(2);
                }}>High</Button>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Button onPress={() => setAddModal(!addModal)}
                  style={styles.modalButton}>Cancel</Button>
          <Button onPress={() => {
            add(text, priority);
            setText(null);
            setAddModal(!addModal);
          }} style={styles.modalButton}>Add</Button>
        </View>
      </View>
    </Modal>
    <ScrollView horizontal={true}>
      <ScrollView style={styles.listArea}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.sectionHeading1}>Tasks</Text>
          <Button appearance="ghost" onPress = {() => setAddModal(!addModal)} accessoryLeft = {addIcon} style={{marginLeft: width*.45}}
          />
        </View>
        <Items
          key={`forceupdate-todo-${forceUpdateId}`}
          done={false}
          onPressItem={id =>
            db.transaction(
              tx => {
                tx.executeSql(`update items set done = 1 where id = ?;`, [
                  id
                ]);
              },
              null,
              forceUpdate
            )
          }
        />
        </ScrollView>
        <ScrollView style={styles.listArea}>
        <Text style={styles.sectionHeading2}>Completed</Text>
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
    </ScrollView>
    </View>
  );

}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    height: height*.7,
    //paddingTop: Constants.statusBarHeight
  },
  input: {
    height: 40,
    margin: 16,
    padding: 8
  },
  listArea: { //to do container
    backgroundColor: "rgba(51, 148, 143, 0.16)",
    flex: 1,
    paddingTop: 16,
    width: width*.8,
    height: height*.65,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: height*.02,
    marginHorizontal: width*.1
  },
  sectionContainer: { //each section of container
    marginBottom: 15,
    marginHorizontal: 20,
  },
  sectionHeading1: {
    fontFamily: 'gafata-regular',
    fontSize: 18,
    marginTop: 12,
    marginHorizontal: 20
  },
  sectionHeading2: {
    fontFamily: 'gafata-regular',
    fontSize: 18,
    marginTop: 12,
    marginHorizontal: 20,
    marginBottom: 15
  },
  modalContainer: {
    borderRadius: 25,
    backgroundColor: "rgba(51, 148, 143, 0.16)",
    marginVertical: height*.15,
    marginHorizontal: width*.08,
    height: height*.7,
  }, 
  modalHeading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'gafata-regular',
    marginTop: height*.05,
    marginHorizontal: width*.05,
  },
  modalButton: {
    width: 88,
    height: 40,
    marginTop: 55,
    marginHorizontal: 15,
  },
  priorityLabel: {
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
    marginBottom: 5,
    marginHorizontal: width*.05,
    paddingTop: 5
  },
  priorityButton: {
    marginVertical: 5,
    width: width*.2,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  }
});