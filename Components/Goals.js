import React from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import { Button } from '@ui-kitten/components';

export default function goals({ navigation }) {
    const [text, setText] = React.useState('');
    const goals = [];

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <TextInput 
                    onChangeText = {(text) => setText(text)}
                    onSubmit = {() => goals.push(text)}
                    style={styles.textInput}/>
                <Button
                    onPress = {() => goals.push(text)}
                    style={styles.inputButton}>
                    <Text>
                        Add
                    </Text>
                </Button>
            </View>
            <Text
                style={styles.heading}>
                    Reminder:
            </Text>
            {goals.map((goal) => (
                <View>
                    <Text>{`- ${goal}`}</Text>
                </View>
            ))}
            <Button
                appearance='ghost'
                onPress={() => navigation.navigate("Today")}>
                <Text>Next</Text>
            </Button>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        alignSelf: "center",
        marginTop: 40,
        marginRight: -2,
        margin: 15,
        width: width * .65,
        height: height * .06,
        borderRadius: 15,
        backgroundColor: "rgba(51, 148, 143, 0.16)"
    },
    inputButton: {
        marginTop: 40,
        margin: 15,
        alignSelf: "center",
        borderRadius: 15,
        width: width * .2,
        height: height * .04,
    },
    heading: {
        marginTop: 30,
        alignSelf: "center",
        fontSize: 20,
    }
})