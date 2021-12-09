import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import { showMessage, hideMessage  } from "react-native-flash-message"

import { courseEscolarService } from '../../services/courseEscolar.js'
import {validators} from '../../helpers/validators'

export default class FormCourseEscolar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      start_year:"",
      end_year:"",
      errors:[]
    }
  }

  cleanInputs(error=0){
    this.setState({
      number:"",
      start_year:"",
      end_year:"",
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

  insertCourseEscolar= async (e) => {
    try{
      let res = await courseEscolarService.add({
        number: parseInt(this.state.number),
        start_year:String(this.state.start_year),
        end_year:String(this.state.end_year)
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Insertado correctamente' })
        this.cleanInputs()
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: "Error al insertar el Courso Escolar"})
        this.setState({ errors: error })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs(1)
  }

  updateCourseEscolar= async (e) => {
    try{
      let res = await courseEscolarService.edit({
        number: parseInt(this.state.number),
        start_year:String(this.state.start_year),
        end_year:String(this.state.end_year)
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Actualizado correctamente' })
        this.cleanInputs()
      }else if(res.status == 404){
        showMessage({ type: 'danger', message: 'El Departamento no existe' })
      }else{
        let error = await res.json()
        console.error(error)
        showMessage({ type: 'danger', message: "Error al actualizar el Departamento" })
        this.setState({ errors: error })
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
    }
  }

  deleteCourseEscolar= async (e) => {
    try{
      let res = await courseEscolarService.delete({
        number:parseInt(this.state.number),
      })
      if(res.ok){
        showMessage({ type: 'success', message: "Eliminado Correctamente"})
      }else if(await res.status == 404){
        showMessage({ type: 'danger', message: 'El Curso Escolar no Existe' })
      }else{
        showMessage({ type: 'danger', message: 'Error al eliminar el Curso Escolar' })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs()
  }
  
  getCourseEscolarById= async (e) => {
    try{
      this.cleanInputs()
      let res = await courseEscolarService.getById(parseInt(this.state.number))
      if(await res.status == 200){
        let courseEscolar = await res.json()
        this.setState({
          number:courseEscolar.number.toString(),
          start_year:String(courseEscolar.start_year),
          end_year:String(courseEscolar.end_year),
        })
        showMessage({ type: 'success', message: 'Curso Escolar Encontrado' })

      }else if(await res.status == 404){
        showMessage({ type: 'danger', message: 'El Curso Escolar no existe' })
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
            placeholder="Digite el numero del curso escolar"
            onChangeText={textInputValue => this.validateNumber(textInputValue,'number') }
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
            placeholder="Digite el año de inicio"
            onChangeText={textInputValue => this.validateNumber(textInputValue, 'start_year')}
            underlineColorAndroid='transparent'
            keyboardType='number-pad'
            maxLength={4}
            style={styles.styleInput}
            value={this.state.start_year}
          />
            { 'start_year' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.start_year[0]}</Text>
              :
              null
            }
          <TextInput
            placeholder="Digite el año de finalizacion"
            onChangeText={textInputValue => this.validateNumber(textInputValue,'end_year')}
            underlineColorAndroid='transparent'
            keyboardType='number-pad'
            maxLength={4}
            style={styles.styleInput}
            value={this.state.end_year}
          />
            { 'end_year' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.end_year[0]}</Text>
              :
              null
            }
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.insertCourseEscolar.bind(this)}>
              <Text style={styles.TextStyle}> Insertar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.updateCourseEscolar.bind(this)}>
              <Text style={styles.TextStyle}> Actualizar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.deleteCourseEscolar.bind(this)}>
              <Text style={styles.TextStyle}> Borrar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getCourseEscolarById.bind(this)}>
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
  