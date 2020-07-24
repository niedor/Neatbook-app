import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Calendar(){

}

const styles = StyleSheet.create({
  calendarHeading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plannerRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  days: {
    width: 45,
    backgroundColor: 'white',
  },
  plannerCells: {
    width: 45,
    height: 60,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  calendarNum: {
    marginLeft: 2,
    fontFamily: 'Times New Roman',
    fontSize: 18,
  }
});
