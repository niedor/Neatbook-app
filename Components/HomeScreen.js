import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

/*Example of a presentation component, because this component only requires a stateless
function, no class and thus, only renders HTML. That is what is characteristic of presentation components: they are stateless.
"Data is kept in sync using props."
*/

//Imagine what you could accomplish tomorrow if you started today.
function HomeScreen({navigation}){
    const [dataLoaded, setDataLoaded] = React.useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}/>
        );
    }

    return(
        <View style={styles.main}>
            <Text style={styles.titleText}>
                Neatbook
            </Text>
            <Button title="Continue" onPress={()=> navigation.navigate('Today')} buttonStyle={styles.button}/>
        </View>
    )
}

const fetchFonts = () => {
    return Font.loadAsync({
        'gafata-regular': require('../assets/fonts/Gafata-Regular.ttf')
    });
};

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
        fontFamily: 'gafata-regular',
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
        fontFamily: 'gafata-regular',
    }
});

export default HomeScreen;