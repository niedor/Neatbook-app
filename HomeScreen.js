import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { Button } from 'react-native-elements';

/*Example of a presentation component, because this component only requires a stateless
function, no class and thus, only renders HTML. That is what is characteristic of presentation components: they are stateless.
"Data is kept in sync using props."
*/

//Imagine what you could accomplish tomorrow if you started today.
function HomeScreen({navigation}){
    return(
        <View style={styles.main}>
            <Text style={styles.titleText}>
                Planner
            </Text>
            <Button title="Continue" onPress={()=> navigation.navigate('Today')} buttonStyle={styles.button}/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#C38EC7',
    },
    titleText: {
        marginTop: 100,
        marginHorizontal: 50,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'Times New Roman',
        paddingBottom: 250,
    },
    button: {
        width: 150,
        alignSelf: 'center',
        backgroundColor: '#488AC7', //called Silk Blue
    }
});

export default HomeScreen;