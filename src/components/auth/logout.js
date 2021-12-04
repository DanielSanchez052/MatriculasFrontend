import React from 'react';
import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, AsyncStorageStatic } from 'react-native';
import { authService }  from '../../services/auth.js'
import {storage} from '../../services/storage.js'

export default class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.logout = this.props.logout
        this.logout()
    }

    render() {
        return (
            <View></View>
        )
    }
}


