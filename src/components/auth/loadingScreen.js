import React from 'react'
import { storage } from '../../services/storage.js'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    
    this.navigation = this.props.navigation
  }

  componentDidMount() {
    this._loadInitialState();
  }

  _loadInitialState= async ()=>{
    let value = await storage.get('access')
    console.log(value)
    if( value !== null ){
      this.navigation.navigate("Personas",{ screen:"Modificar" })
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}