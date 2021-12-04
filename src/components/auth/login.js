import React from 'react';
import { StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, AsyncStorageStatic } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { authService }  from '../../services/auth.js'
import {storage} from '../../services/storage.js'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email:"",
            password:"",
        }
        this._loadInitialState()
        this.navigation = this.props.navigation
        this.route = this.props.route 
        this.login = this.props.login
    }

    cleanInputs(){
        this.setState({
            email:"",
            password:"",
            is_token : false
        })
    }

    _loadInitialState= async ()=>{
        let value = await storage.get('access')
        
        if( value !== null ){
            this.setState({is_token: true})
            this.navigation.navigate("Personas",{ screen:"Modificar" })
        }
    }

    render() {
        return (
        <ScrollView>
            <View style={styles.container}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Iniciar sesión </Text>

            <TextInput
                placeholder="Email"
                onChangeText={textInputValue => this.setState({ email: textInputValue })}
                underlineColorAndroid='transparent'
                style={styles.styleInput}
                value={this.state.email}
            />

            <TextInput
                secureTextEntry={true}
                placeholder="Contarseña"
                onChangeText={textInputValue => this.setState({ password: textInputValue })}
                underlineColorAndroid='transparent'
                style={styles.styleInput}
                value={this.state.password}
            />

            <View style={styles.containerButton}>
                <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.login.bind(this, this.state.email,this.state.password)}>
                <Text style={styles.TextStyle}> Iniciar sesión </Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    },
    containerButton:{ 
        justifyContent: 'center',
        paddingTop: 20,
        flexWrap:'wrap',
        flexDirection:'row',
    },
    styleInput: {
        width: '85%',
        marginVertical:20,
        marginHorizontal:10,
        borderColor: 'black',
        borderBottomWidth:1,
        borderRadius: 10,
        alignSelf: 'center'
    },
    TouchableOpacityStyle: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        marginBottom: 7,
        width: '45%',
        backgroundColor: '#4CAF50'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },

    rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    }
});


