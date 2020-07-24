import * as React from 'react';
import { Calendar, Divider } from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native';

export default function CalendarPage(){
  return(
    <View style={styles.container}>
      <Calendar/>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignContent: 'center',
  }
})


