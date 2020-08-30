import React from 'react';
import Svg, {Circle, Text, TSpan} from 'react-native-svg';
import { StyleSheet, Dimensions } from 'react-native';

//Svg on Today Page
export default function BigCircleSvg(){
    let opacity;
    let today = new Date();
    let greeting;
    let subGreeting;

    //FOR UPDATE: more greetings
    let timeOfDay = today.getHours();

    if (timeOfDay < 12){
        greeting = "Good Morning!";
        subGreeting = "Let's make today a productive one";
        opacity = .22;
    } else if (timeOfDay >= 12 && timeOfDay < 17) {
        greeting = "Good Afternoon!";
        subGreeting = "What do you have to do today?";
        opacity = .6;
    } else {
        greeting = "Good Evening";
        subGreeting = "It's never too late to get things done!";
        opacity = 1;
    }

    const viewY = height*.3;
    const viewX = width;

    return(
        <Svg height={viewY} width={viewX}>
            <Circle cx="188" cy="105" r="78" fill='#91DBD4' opacity={opacity}/>
            <Text x="70" y="110" fontSize="35" fontWeight="bold">{greeting}</Text>
            <Text x="50" y="140" fontSize="18">{subGreeting}</Text>
        </Svg>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    greeting: {
        fontSize: 35,
        textAlign: 'center',
        marginTop: height*.05
    }
})