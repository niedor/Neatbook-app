import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
import { Button, Modal, Drawer, DrawerGroup } from '@ui-kitten/components';
import { Icon } from 'react-native-elements';

export default function AddTaskModal(props){
    const yellow = "#F8D763";
    const orange = "#F88017";
    const red = "#C04000";

    let newTask = "";
    let priority = "";

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

      const boxedAddIcon = () => (
        <Icon name="plus-square-o" type="font-awesome" color="#82BDB8" style={{marginLeft: 30}}/> 
      )

    return(
        <Modal transparent = {true} visible = {props.addModal}>
            <View style = {styles.modalContainer}>
                <TouchableOpacity
                onPress={() => props.setAddModal(!props.addModal)}>
                    <Icon name="close" color="#82BDB8" style={{alignSelf: 'flex-end', marginRight: 15, marginTop: 15}}/>
                </TouchableOpacity>
                <Text style={styles.modalHeading}>Create New Task</Text>
                <Text style={{color: "#82BDB8", marginLeft: 38, marginTop: 20}}>Name</Text>
                <TextInput
                onChangeText={text => newTask = text}
                style={styles.input}
                />
                <Text style={styles.priorityLabel}>Choose a priority level: </Text>
                <View style={{flexDirection:'row', justifyContent: 'center'}}>
                {priorityLevelsArray.map(({id, color, text}) => (
                    <TouchableOpacity
                    key={id}
                    style={styles.priorityButton}
                    onPress={() => priority = color}
                    underlayColor="#D4E9E7">
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Icon name = "circle" type = "font-awesome" size = {12} color={color} style={{marginHorizontal: 5}}/>
                        <Text style={{fontSize: 12, color: "#33948F", justifyContent: 'center'}}>{text}</Text>
                        </View>
                    </TouchableOpacity>
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
                        props.addTask(newTask, priority);
                        props.setAddModal(!props.addModal);
                    }} 
                    style={styles.modalButton}>
                    <Text style={{color: "#33948F", marginLeft: 19, marginTop: 9}}>CREATE TASK</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
      modalButton: {
        width: 130,
        height: 38,
        borderRadius: 20,
        backgroundColor: '#D4E9E7',
        alignSelf: 'center',
        marginBottom: 30
      },
      modalDrawer: {
        backgroundColor: "#33948F",
        marginVertical: -3
      }
})