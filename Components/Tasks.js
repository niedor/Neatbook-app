import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const db = SQLite.openDatabase("db.db");

const low = "#F8D763";
const medium = "#EAA800";
const high = "#875500";

function Items({ done: doneHeading, onPressItem }) { //this way of declaring props is known as JS object destructuring
  const [items, setItems] = React.useState(null);
  const [priorityColor, setPriorityColor] = React.useState(null);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ? AND priority = ?;`,
        [doneHeading ? 1 : 0, ],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      {items.map(({ id, done, value, priority }) => (
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
            <Icon name = "circle" type = "font-awesome" size = {15} color={priorityColor}/>
            <Text style={{ color: done ? "white" : "#000", fontSize: 15, marginLeft: 10}}>{value}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function Task(){
    return(
        <
    )
}