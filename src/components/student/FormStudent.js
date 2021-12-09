import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import {Picker} from '@react-native-picker/picker'

import { studentService } from '../../services/student.js'
import { showMessage, hideMessage  } from "react-native-flash-message"
// import FlashMessage from "react-native-flash-message"
import {validators} from '../../helpers/validators'

export default class FormStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      identification_number:"",
      email:"",
      name:"",
      last_name:"",
      second_last_name: "",
      city: "",
      direction:"",
      phone_number:"",
      date_born:"",
      gender:"M",
      person_type:"S",
      password:"",
      errors:[]
    }
  }

  cleanInputs(error=0){
    this.setState({
      identification_number:"",
      email:"",
      name:"",
      last_name:"",
      city: "",
      direction:"",
      phone_number:"",
      date_born:"",
      gender:"M",
      person_type:"S",
      password:"",
    })
    error === 0 
    ?
    this.setState({errors:[]})
    :
    null
  }

  validateNumber(text,stateName){
    let state = {}
    state[stateName] = text 
    validators.validateNumber(text) || this.state[stateName].length == 1
              ? this.setState(state) : ''
  }

  validateText(text,stateName){
    let state = {}
    state[stateName] = text 
    validators.validateText(text) || this.state[stateName].length == 1
              ? this.setState(state) : ''
  }
  
  insertStudent = async (e) =>{
    try{
      let res = await studentService.add({
        identification_number:this.state.identification_number,
        email: this.state.email,
        name:this.state.name,
        last_name:this.state.last_name,
        city: this.state.city,
        direction:this.state.direction,
        phone_number:this.state.phone_number,
        date_born:this.state.date_born,
        gender:this.state.gender,
        person_type:this.state.person_type,
        password:this.state.password,
        errors: []
      })
      
      if(res.ok){
        showMessage({ type: 'success', message: 'Insertado correctamente' })
        this.cleanInputs()
      }else if(await res.status == 400){
        let error = await res.json()
        console.log(error)
        showMessage({ type: 'danger', message: "Error al insertar la persona"})
        this.setState({ errors: error })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: 'Error' })
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
      this.cleanInputs(1)
    }
  }

  updateStudent = async (e) => {
    try{
      let res = await  studentService.edit({
        identification_number:this.state.identification_number,
        email: this.state.email,
        name:this.state.name,
        last_name:this.state.last_name,
        city: this.state.city,
        direction:this.state.direction,
        phone_number:this.state.phone_number,
        date_born:this.state.date_born,
        gender:this.state.gender,
        person_type:this.state.person_type,
        password:this.state.password
      })
      
      if(res.ok){
        showMessage({ type: 'success', message: 'Actualizado correctamente' })
        this.cleanInputs()
      }else if(res.status == 404){
        showMessage({ type: 'danger', message: 'El Curso no existe' })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: error.message })
        this.setState({ errors: error.errors })
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
    }
    
  }

  deleteStudent = async (e) => {
    try{
      let res = await  studentService.delete({
        identification_number:this.state.identification_number,
      })
      if(await res.status == 200){
        showMessage({ type: 'success', message: "Persona eliminada Correctamente" })
      }else if(await res.status == 404){
        let error = await res.json()
        showMessage({ type: 'danger', message: error.message })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: 'Error AL eliminar el usuario' })
        console.log(error)
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs()
  }

  getStudentById = async (e) => {
    try{
      this.cleanInputs()
      let res = await studentService.getById(this.state.identification_number)
      if(await res.status == 200){
        let person = await res.json()
        this.setState({ 
          identification_number:person.identification_number,
          email: person.email,
          name:person.name,
          last_name:person.last_name,
          city: person.city,
          direction: person.direction ? person.direction : '',
          phone_number:person.phone_number?person.phone_number:'',
          date_born:person.date_born,
          gender:person.gender,
          person_type:person.person_type,
          password:''
        })
        showMessage({ type: 'success', message: 'Persona Encontrada' })

      }else if(await res.status == 404){
        showMessage({ type: 'danger', message: 'El usuario no existe' })
      }else{
        showMessage({ type: 'danger', message: 'Error' })
      }
    }catch{
      showMessage({ type: 'danger', message: 'Error' })
    }  
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            placeholder="Digite la identificación"
            keyboardType="number-pad"
            onChangeText={textInputValue => this.validateNumber(textInputValue, 'identification_number')}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.identification_number}
          />
          { 'identification_number' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.identification_number[0]}</Text>
              :
              null
            }

          <TextInput
            placeholder="Digite El correo Electronico"
            onChangeText={textInputValue => this.setState({email:textInputValue})}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.email}
          />
          { 'email' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.email[0]}</Text>
              :
              null
            }
          <View style={styles.rowViewContainer}>
            <TextInput
              placeholder="Digite el nombre"
              onChangeText={textInputValue => this.validateText(textInputValue,'name')}
              underlineColorAndroid='transparent'
              style={styles.styleInputRow}
              value={this.state.name}
            />
            <TextInput
              placeholder="Digite el Apellido"
              onChangeText={textInputValue => this.validateText(textInputValue,'last_name')}
              underlineColorAndroid='transparent'
              style={styles.styleInputRow}
              value={this.state.last_name}
            />
          </View>
          <TextInput
            placeholder="Digite la Ciudad"
            onChangeText={textInputValue => this.validateText(textInputValue,'city')}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.city}
          />
          { 'city' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.city[0]}</Text>
              :
              null
            }
          <TextInput
            placeholder="Digite la Direccion"
            onChangeText={textInputValue => this.setState({ direction: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.direction}
          />
          { 'direction' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.direction[0]}</Text>
              :
              null
            }
          <TextInput
            placeholder="Digite el Numero de telefono"
            onChangeText={textInputValue => this.validateNumber(textInputValue,'phone_number')}
            underlineColorAndroid='transparent'
            keyboardType="number-pad"
            style={styles.styleInput}
            value={this.state.phone_number}
          />
          
          <TextInput
            placeholder="Digite la Fecha de nacimiento"
            onChangeText={textInputValue => this.setState({ date_born: textInputValue })} 
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.date_born}
          />    
          { 'date_born' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.date_born[0]}</Text>
              :
              null
            }    
          <View style={styles.rowViewContainer}>
            <View style={styles.stylePicker}> 
              <Picker
                selectedValue={this.state.gender}
                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
                style={{width:'100%', height:40}}>
                <Picker.Item label='Masculino' value='M' />
                <Picker.Item label='Femenino' value='F' />
              </Picker>
            </View>
            <View style={styles.stylePicker}> 
              <Picker
                selectedValue={this.state.person_type}
                onValueChange={(itemValue, itemIndex) => this.setState({person_type: itemValue})}
                style={{width:'100%', height:40}}>
                <Picker.Item label='Estudiante' value='S' />
                <Picker.Item label='Profesor' value='T' />
              </Picker>
            </View>
          </View>
          <TextInput
            placeholder="Digite la Contraseña"
            label='password'
            onChangeText={textInputValue => this.setState({ password: textInputValue })}
            secureTextEntry={true}
            autoComplete="password"
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.password} 
            />
            { 'password' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.password[0]}</Text>
              :
              null
            }

          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.insertStudent.bind(this)}>
              <Text style={styles.TextStyle}> Insertar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.updateStudent.bind(this)}>
              <Text style={styles.TextStyle}> Actualizar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.deleteStudent.bind(this)}>
              <Text style={styles.TextStyle}> Borrar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getStudentById.bind(this)}>
              <Text style={styles.TextStyle}> Buscar </Text>
            </TouchableOpacity>
          </View>
          {/* <FlashMessage position="top" /> */}
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
      backgroundColor: '#fff',
      height:'100%'
    },
    containerButton:{ 
      justifyContent: 'center',
      paddingTop: 20,
      flexWrap:'wrap',
      flexDirection:'row',
    },
    styleInput: {
      width: '85%',
      marginTop: 15,
      marginLeft:20,
      marginRight:20,
      borderColor: 'black',
      borderBottomWidth:1,
      height:45,
      alignSelf: 'center'
    },
    stylePicker: {
      width: '40%',
      marginTop: 15,
      marginLeft:20,
      marginRight:20,
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
    error:{
      color: '#FE8A8A',
      textAlign: 'center',
    },
    rowViewContainer: {
      flexDirection: 'row',
    },
    styleInputRow: {
      width: '41%',
      marginTop: 15,
      marginLeft:10,
      marginRight:10,
      borderColor: 'black',
      borderBottomWidth:1,
      height:45,
      alignSelf: 'center'
    },
  
  });
  

