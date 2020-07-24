import * as React from 'react';
import { StyleSheet, View, Text  } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function AllEntriesPage(){
    const [allJournals, setArray] = React.useState(null);

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE if not exists journals (id integer primary key not null, entry text, year int, month int, day int);");
            tx.executeSql(
                "SELECT * from journals;",
                [], 
                (_, {rows: { _array }}) => console.log(_array)
            );
        });
    }, []);

    return(
        <View style={styles.container}>
            <Text>{JSON.stringify(allJournals)}</Text>
            <Text>I'm still here</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    }
});

