import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button } from '@ui-kitten/components';

export default function MorePage({navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.page}>
                <Button onPress={() => navigation.navigate('All Journals')} style={styles.button}>ALL JOURNALS</Button>
                <Button style={styles.button}>ALL EVENTS</Button>
            </View>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    page: {
        margin: 30,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    button: {
        height: height*.1,
        width: width*.4,
        marginHorizontal: 15,
        borderRadius: 25
    }
})