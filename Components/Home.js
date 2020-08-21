import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';

function HomeScreen({navigation}){

    return(
        <View style={styles.main}>
            <Text style={styles.titleText}>
                Neatbook
            </Text>
            <Button title="Continue" onPress={()=> navigation.navigate('Today')} buttonStyle={styles.button}/>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#33948F',
    },
    titleText: {
        width: width*.46,
        padding: 20,
        marginTop: height*.27,
        marginHorizontal: 50,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 26,
        color: 'white',
        borderWidth: 2,
        borderStyle: 'dotted', //won't render
        borderColor: '#E5E4E2' //Platinum
    },
    button: {
        width: 150,
        alignSelf: 'center',
        backgroundColor: '#33948F',
        marginTop: height*.35,
    }
});

export default HomeScreen;