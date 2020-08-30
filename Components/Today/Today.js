import React from 'react';
import {StyleSheet, View, Text, Dimensions, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '@ui-kitten/components';
import BigCircleSvg from './SvgCollection';
import TodoList from './TodoList';
import getMonth from '../getMonthText';

//add feature: set reminders for monthly/weekly tasks. example: check bank statement, walk dog at a certain time, stretch at a certain time, read at a certain time
export default function Today({navigation}){
    let today = new Date();
    let monthNum = today.getMonth();
    let month = getMonth(monthNum); 
    let date = today.getDate();
    let year = today.getFullYear();
    
    const menuIcon = () => (
        <Icon name='menu' />
    )

    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Button style={styles.menuButton} appearance='ghost' accessoryLeft={menuIcon}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}/>
                <Text style={styles.date}>{`${month} ${date}, ${year}`}</Text>
            </View>
            <BigCircleSvg />
            <TodoList />
        </ScrollView>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header:{
        flexDirection: 'row',
    },
    menuButton: {
        alignSelf: 'flex-start',
        marginHorizontal: 10,
    },
    date: {
        marginTop: height*.025,
        marginHorizontal: width*.19,
        color: 'grey'
    }
});
