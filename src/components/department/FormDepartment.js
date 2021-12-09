import React from 'react'; 
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import { showMessage, hideMessage  } from "react-native-flash-message"

import { departmentService } from '../../services/department.js'
import {validators} from '../../helpers/validators'

export default class FormDepartment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      name:"",
      errors:[]
    }
  } 

  cleanInputs(error=0){
    this.setState({
      number:"",
      name:"",
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
  
  insertDepartment= async (e) => {
    try{
      let res = await departmentService.add({
        number: parseInt(this.state.number),
        name:this.state.name
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Insertado correctamente' })
        this.cleanInputs()
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: "Error al insertar el Departamento"})
        this.setState({ errors: error })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs(1)
  }

  updateDepartment= async (e) => {
    try{
      let res = await departmentService.edit({
        number: parseInt(this.state.number),
        name:this.state.name
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Actualizado correctamente' })
        this.cleanInputs()
      }else if(res.status == 404){
        showMessage({ type: 'danger', message: 'El Departamento no existe' })
      }else{
        showMessage({ type: 'danger', message: "Error al actualizar el Departamento" })
        this.setState({ errors: error })
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
    }
  }

  deleteDepartment= async (e) => {
    try{
      let res = await departmentService.delete({
        number:parseInt(this.state.number),
      })
      if(res.ok){
        showMessage({ type: 'success', message: "Eliminado Correctamente"})
      }else if(await res.status == 404){
        let error = await res.json()
        showMessage({ type: 'danger', message: error.message })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: 'Error al eliminar el departamento' })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs()
  }

  getDepartmentById= async (e) => {
    try{
      this.cleanInputs()
      let res = await departmentService.getById(parseInt(this.state.number))
      if(await res.status == 200){
        let department = await res.json()
        this.setState({
          number:department.number.toString(),
          name:department.name,
        })
        showMessage({ type: 'success', message: 'Departamento Encontrado' })
  
      }else if(await res.status == 404){
        showMessage({ type: 'danger', message: 'El Departamento no existe' })
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
            placeholder="Digite el numero del departamento"
            onChangeText={textInputValue => this.validateNumber(textInputValue,'number')}
            underlineColorAndroid='transparent'
            keyboardType='number-pad'
            style={styles.styleInput}
            value={this.state.number}
          />
          { 'number' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.number[0]}</Text>
              :
              null
            }
          <TextInput
            placeholder="Digite el nombre"
            onChangeText={textInputValue => this.validateText(textInputValue,'name')}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.name}
          />
          { 'name' in this.state.errors ? 
            <Text style={styles.error}>{this.state.errors.name[0]}</Text>
            :
            null
          }
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.insertDepartment.bind(this)}>
              <Text style={styles.TextStyle}> Insertar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.updateDepartment.bind(this)}>
              <Text style={styles.TextStyle}> Actualizar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.deleteDepartment.bind(this)}>
              <Text style={styles.TextStyle}> Borrar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getDepartmentById.bind(this)}>
              <Text style={styles.TextStyle}> Buscar </Text>
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
  

