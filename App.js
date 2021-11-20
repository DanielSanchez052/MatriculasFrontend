import React from 'react';
import { Alert,StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import FormStudent from './src/components/FormStudent.js'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }
  render() {
    return (
        <FormStudent /> 
      )
  }
}

