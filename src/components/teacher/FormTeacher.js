import React from 'react'
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { showMessage, hideMessage  } from "react-native-flash-message"

import { teacherService } from '../../services/teacher.js'
import { departmentService } from '../../services/department.js'
import { studentService } from '../../services/student.js'
import {validators} from '../../helpers/validators'

export default class FormTeacher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      person:"",
      department:"",
      dataDepartment:[],
      dataPerson:[],
      errors:[]
    }
  }

  componentDidMount() {
    this.getAllPersons()
    this.getDepartments()
  }

  cleanInputs(error=0){
    this.setState({
      number:"",
      person:"",
      department:"",
    })
    error === 0 
    ?
    this.setState({errors:[]})
    :
    null
  }

  insertTeacher = async (e) => {
    try{
      let res = await teacherService.add({
        number:this.state.number,
        person:this.state.person,
        department:this.state.department,
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Insertado correctamente' })
        this.cleanInputs()
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: "Error al insertar el profesor"})
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

  updateTeacher = async (e) => {
    try{
      let res = await teacherService.edit({
        number:this.state.number,
        person:this.state.person,
        department:this.state.department,
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Actualizado correctamente' })
        this.cleanInputs()
      }else if(res.status == 404){
        showMessage({ type: 'danger', message: 'El Profesor no existe' })
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

  deleteTeacher = async (e) => {
    try{
      let res = await  teacherService.delete({
        number:this.state.number,
      })
      if(res.ok){
        showMessage({ type: 'success', message: "Eliminado Correctamente"})
      }else if(await res.status == 404){
        let error = await res.json()
        showMessage({ type: 'danger', message: error.message })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: 'Error al eliminar el Profesor' })
        console.log(error)
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs()
  }
  
  getTeacherById = async (e) => {
    try{
      this.cleanInputs()
      let res = await teacherService.getById(this.state.number)
      if(await res.status == 200){
        let teacher = await res.json()
        this.setState({
          number: String(teacher.number),
          person:teacher.person.id,
          department:teacher.department.id,
        })
        showMessage({ type: 'success', message: 'Profesor Encontrado' })

      }else if(await res.status == 404){
        showMessage({ type: 'danger', message: 'El profesor no existe' })
      }else{
        showMessage({ type: 'danger', message: 'Error' })
      }
    }catch{
      showMessage({ type: 'danger', message: 'Error' })
    }  
  }

  getAllPersons(e){
    studentService.getAll()
      .then( res => {
        this.setState({ dataPerson: res.filter( e => e.person_type=='T') })
      })
  }
  
  getDepartments(e){
    departmentService.getAll()
    .then( res => this.setState({ dataDepartment: res }) )
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            placeholder="Digite el Numero de profesor"
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
          <View style={styles.stylePicker}>
            <Picker
              selectedValue={this.state.person}
              onValueChange={(itemValue, itemIndex) => this.setState({person: itemValue})}
              style={{width:'100%', height:40}}>
                {
                  this.state.dataPerson.map( e => 
                    <Picker.Item key={e.id} label={e.name +' '+e.last_name}  value={e.id} />
                    )
                }
            </Picker>
          </View>
          { 'person' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.person[0]}</Text>
              :
              null
            }
          <View style={styles.stylePicker}> 
            <Picker
              selectedValue={this.state.department}
              onValueChange={(itemValue, itemIndex) => this.setState({department: itemValue})}
              style={{width:'100%', height:40}}
              >
                {
                  this.state.dataDepartment.map( e => 
                    <Picker.Item key={e.id} label={e.name}  value={e.id} />
                    )
                }
            </Picker>
          </View>
          { 'department' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.department[0]}</Text>
              :
              null
            }
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.insertTeacher.bind(this)}>
              <Text style={styles.TextStyle}> Insertar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.updateTeacher.bind(this)}>
              <Text style={styles.TextStyle}> Actualizar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.deleteTeacher.bind(this)}>
              <Text style={styles.TextStyle}> Borrar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getTeacherById.bind(this)} >
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
      width: '85%',
      marginTop: 15,
      marginLeft:20,
      marginRight:20,
      height:45,
      alignSelf: 'center'
    },
    TouchableOpacityStyle: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
      marginBottom: 7,
      width: '45%',
      backgroundColor: '#4CAF50',
      zIndex:2
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
      fontSize: 20,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    }
  
  });
  

