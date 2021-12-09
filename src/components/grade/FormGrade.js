import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import { showMessage, hideMessage  } from "react-native-flash-message"

import { gradesService } from '../../services/grades'
import {validators} from '../../helpers/validators'

export default class FormGrade extends React.Component {
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
      name:""
    })
    error === 0 
    ?
    this.setState({errors:[]})
    :
    null
  }

  insertGrade = async (e) => {
    try{
      let res = await gradesService.add({
        number:parseInt(this.state.number),
        name:this.state.name
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Insertado correctamente' })
        this.cleanInputs()
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: "Error al insertar el Grado"})
        this.setState({ errors: error })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs(1)
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

  updateGrade = async (e) => {
    try{
      let res = await gradesService.edit({
        number:parseInt(this.state.number),
        name:this.state.name
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Actualizado correctamente' })
        this.cleanInputs()
      }else if(res.status == 404){
        showMessage({ type: 'danger', message: 'El Grado no existe' })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: "Error al actualizar el Grado" })
        this.setState({ errors: error })
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
    }
  }

  deleteGrade = async (e) => {
    try{
      let res = await gradesService.delete({
        number:parseInt(this.state.number),
      })
      if(res.ok){
        showMessage({ type: 'success', message: "Eliminado Correctamente"})
      }else if(await res.status == 404){
        let error = await res.json()
        showMessage({ type: 'danger', message: error.message })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: 'Error al eliminar el grado' })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs()
  }

  getGradeById = async (e) => {
      try{
        this.cleanInputs()
        let res = await gradesService.getById(parseInt(this.state.number))
        if(await res.status == 200){
          let grade = await res.json()
          this.setState({  
            number:grade.number.toString(),
            name:String(grade.name),
          })
          showMessage({ type: 'success', message: 'Grado Encontrado' })
  
        }else if(await res.status == 404){
          showMessage({ type: 'danger', message: 'El Grado no existe' })
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
            placeholder="Digite el numero del grado"
            onChangeText={textInputValue => this.validateNumber(textInputValue,'number')}
            underlineColorAndroid='transparent'
            keyboardType="number-pad"
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
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.insertGrade.bind(this)}>
              <Text style={styles.TextStyle}> Insertar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.updateGrade.bind(this)}>
              <Text style={styles.TextStyle}> Actualizar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.deleteGrade.bind(this)}>
              <Text style={styles.TextStyle}> Borrar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getGradeById.bind(this)}>
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
  

