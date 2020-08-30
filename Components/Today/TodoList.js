import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { Button } from '@ui-kitten/components';
import AddTaskModal from './addTaskModal';

//This is a long-term to do list as of now. Might consider adjusting it so that the list clears everyday and any incompleted
//tasks are saved in another file.

const db = SQLite.openDatabase("db.db");

function Items({ done, onPressItem }) { 
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM TodoTable WHERE done = ?;",
        [done ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    console.log("There's nothing here.")
    return(
      <View>
        <Text style={styles.nullMessage}>No completed tasks yet!</Text> 
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      {items.map(({ id, done, value, priority }) => {
        return (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#33948F" : "#fff",
            padding: 8,
            marginVertical: 6,
            borderRadius: 12,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name = "circle" type = "font-awesome" size = {15} color={priority}/>
            <Text style={{ color: done ? "white" : "#000", fontSize: 15, marginLeft: 10}}>{value}</Text>
          </View>
        </TouchableOpacity>
        )
        })}
    </View>
  );
}

//first component:
//majority of function adapted from https://github.com/expo/examples/blob/master/with-sqlite/App.js during learning phase
export default function TodoList() {
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [addModal, setAddModal] = React.useState(false);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE if not exists TodoTable (id integer primary key not null, done int, value text, priority text);"
      );
    });
  }, []);

  const addTask = (text, priority) => {

    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("INSERT INTO TodoTable (done, value, priority) VALUES (0, ?, ?)", [text, priority]);
        tx.executeSql("SELECT * FROM TodoTable", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  }

  const addIcon = () => (
    <Icon name="add" color="#33948F"/>
  );


  return (
    <View style={styles.container}>
    <AddTaskModal addModal = {addModal} setAddModal = {setAddModal} addTask = {addTask}/>
    <ScrollView horizontal={true}>
      <View style={styles.listArea}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.sectionHeading1}>Tasks</Text>
          <Button appearance="ghost" onPress = {() => setAddModal(!addModal)} accessoryLeft = {addIcon} style={{marginLeft: width*.45}}
          />
        </View>
        <ScrollView>
          <Items
            key={`forceupdate-todo-${forceUpdateId}`}
            done={false}
            onPressItem={id =>
              db.transaction(
                tx => {
                  tx.executeSql("UPDATE TodoTable set done = 1 where id = ?;", [
                    id
                  ]);
                },
                null,
                forceUpdate
              )
            }
          />
        </ScrollView>
        </View>
        <View style={styles.listArea}>
        <Text style={styles.sectionHeading2}>Completed</Text>
        <ScrollView>
          <Items
            done
            key={`forceupdate-done-${forceUpdateId}`}
            onPressItem={id =>
              db.transaction(
                tx => {
                  tx.executeSql(`delete from TodoTable where id = ?;`, [id]);
                },
                null,
                forceUpdate
              )
            }
          />
        </ScrollView>
      </View>
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
  },
  listArea: { //to do container
    backgroundColor: "rgba(51, 148, 143, 0.16)",
    flex: 1,
    paddingTop: 16,
    width: width*.8,
    height: height*.53,
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
    fontSize: 18,
    marginTop: 12,
    marginHorizontal: 20
  },
  sectionHeading2: {
    fontSize: 18,
    marginTop: 12,
    marginHorizontal: 20,
    marginBottom: 15
  },
  nullMessage: {
    color: 'gray',
    fontSize: 18,
    textAlign: 'center',
    marginTop: height*.1
  }
});