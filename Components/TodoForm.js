import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight, View, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { Button, Modal, Drawer, DrawerGroup } from '@ui-kitten/components';

//This is a long-term to do list as of now. Might consider adjusting it so that the list clears everyday and any incompleted
//tasks are saved in another file.

const db = SQLite.openDatabase("db.db");

const low = "#F8D763";
const medium = "#EAA800";
const high = "#875500";

//renders tasks (either todo or completed)
function Items({ done, onPressItem }) { //this way of declaring props is known as JS object destructuring
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [done ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    return null;
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

export default function App() {
  let priority;
  const [text, setText] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [addModal, setAddModal] = React.useState(false);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text, priority text);"
      );
    });
  }, []);

  const add = (text, priority, description) => {
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

  const yellow = "#F8D763";
  const orange = "#EAA800";
  const red = "#875500";

  const addIcon = () => (
    <Icon name="add" color="#33948F"/>
  );

  const boxedAddIcon = () => (
    <Icon name="plus-square-o" type="font-awesome" color="#82BDB8" style={{marginLeft: 30}}/> 
  )

  const priorityLevelsArray = [
    {
    id: 0,
    color: yellow,
    text: "low"
    },
    {
    id: 1,
    color: orange,
    text: "medium"
    },
    {
      id: 2,
      color: red,
      text: "high"
    }
  ];

  return (
    <View style={styles.container}>
    <Modal transparent = {true} visible = {addModal}>
      <View style = {styles.modalContainer}>
        <TouchableOpacity
          onPress={() => setAddModal(!addModal)}>
            <Icon name="close" color="#82BDB8" style={{alignSelf: 'flex-end', marginRight: 15, marginTop: 15}}/>
        </TouchableOpacity>
        <Text style={styles.modalHeading}>Create New Task</Text>
        <Text style={{color: "#82BDB8", marginLeft: 38, marginTop: 20}}>Name</Text>
        <TextInput
          onChangeText={text => setText(text)}
          style={styles.input}
          value={text}
        />
        <Text style={styles.priorityLabel}>Choose a priority level: </Text>
        <View style={{flexDirection:'row', justifyContent: 'center'}}>
          {priorityLevelsArray.map(({id, color, text}) => (
            <TouchableHighlight
              key={id}
              style={styles.priorityButton}
              onPress={() => priority = color}
              underlayColor="#D4E9E7">
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Icon name = "circle" type = "font-awesome" size = {12} color={color} style={{marginHorizontal: 5}}/>
                  <Text style={{fontSize: 12, color: "#33948F", justifyContent: 'center'}}>{text}</Text>
                </View>
              </TouchableHighlight>
          ))}
        </View>
        <Drawer style={{backgroundColor: "#33948F"}}>
          <DrawerGroup style={styles.modalDrawer} 
                       title={() => (<Text style={{color: "#82BDB8"}}>Add Time</Text>)}
                       accessoryLeft={boxedAddIcon}>
            <TextInput />
          </DrawerGroup>
        </Drawer>
            
          <TouchableOpacity 
              onPress={() => {
                add(text, priority);
                setText(null);
                setAddModal(!addModal);
              }} 
              style={styles.modalButton}>
            <Text style={{color: "#33948F", marginLeft: 19, marginTop: 9}}>CREATE TASK</Text>
          </TouchableOpacity>
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
    backgroundColor: "#33948F",
    height: 417,
    width: 310
  }, 
  modalHeading: {
    color: "#91DBD4",
    textAlign: 'center',
    fontSize: 26,
    marginHorizontal: width*.05,
  },
  input: {
    alignSelf: 'center',
    width: 233,
    height: 20,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#82BDB8",
    color: "#91DBD4",
  },
  modalButton: {
    width: 130,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#D4E9E7',
    alignSelf: 'center',
    marginBottom: 30
  },
  priorityLabel: {
    color: "#82BDB8",
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  priorityButton: {
    margin: 10,
    width: width*.2,
    height: 23,
    borderColor: 'transparent',
    borderRadius: 15,
    backgroundColor: "#D4E9E7",
  },
  modalDrawer: {
    backgroundColor: "#33948F",
    marginVertical: -3
  }
});