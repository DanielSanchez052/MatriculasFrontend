import React from 'react'
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { showMessage, hideMessage  } from "react-native-flash-message"

import { studentCourse } from '../../services/studentCourse.js'
import { studentService } from '../../services/student.js'
import { courseService } from '../../services/course.js'
import { courseEscolarService } from '../../services/courseEscolar.js'
import {validators} from '../../helpers/validators'


export default class FormstudentCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      user:"",
      course:"",
      courseEscolar:"",
      dataUser:[],
      dataCourse:[],
      dataCourseEscolar:[],
      errors:[]
    }
  }

  componentDidMount() {
    this.getAllPersons()
    this.getCourses()
    this.getcourseEscolar()
  }

  validateNumber(text,stateName){
    let state = {}
    state[stateName] = text 
    validators.validateNumber(text) || this.state[stateName].length == 1
              ? this.setState(state) : ''
  }

  getcourseEscolar(e){
    courseEscolarService.getAll()
    .then( res => { 
      this.setState({ dataCourseEscolar: res }) })
  }

  getCourses(e){
    courseService.getAll()
    .then( res => this.setState({ dataCourse: res }) )
  }

  getAllPersons(e){
    studentService.getAll()
      .then( res => { this.setState({ dataUser: res.filter( e => e.person_type=='S') }) })
  }

  cleanInputs(error=0){
    this.setState({
      number:"",
      user:"",
      course:"",
      courseEscolar:"",
    })
    error === 0 
    ?
    this.setState({errors:[]})
    :
    null
  }

  insertStudentCourse= async (e) => {
    try{
      let res = await studentCourse.add({
        number: parseInt(this.state.number),
        user:this.state.user,
        course:this.state.course,
        course_escolar:this.state.courseEscolar,
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Insertado correctamente' })
        this.cleanInputs()
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: "Error al insertar el Estudiante Curso"})
        this.setState({ errors: error })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs(1)
  }

  updateStudentCourse= async (e) => {
    try{
      let res = await studentCourse.edit({
        number: parseInt(this.state.number),
        user:this.state.user,
        course:this.state.course,
        course_escolar:this.state.courseEscolar,
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Actualizado correctamente' })
        this.cleanInputs()
      }else if(res.status == 404){
        showMessage({ type: 'danger', message: 'El Estudiante Curso no existe' })
      }else{
        let error = await res.json()
        console.error(error)
        showMessage({ type: 'danger', message: "Error al actualizar el Estudiante Curso" })
        this.setState({ errors: error })
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
    }
  }

  deleteStudentCourse= async (e) => {
    try{
      let res = await studentCourse.delete({
        number:parseInt(this.state.number),
      })
      if(res.ok){
        showMessage({ type: 'success', message: "Eliminado Correctamente"})
      }else if(await res.status == 404){
        showMessage({ type: 'danger', message: "el Estudiante Curso no existe" })
      }else{
        showMessage({ type: 'danger', message: 'Error al eliminar el Estudiante Curso' })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs()
  }

  getStudentCourseById= async (e) => {
      try{
        this.cleanInputs()
        let res = await studentCourse.getById(parseInt(this.state.number))
        if(await res.status == 200){
          let studentCourse = await res.json()
          this.setState({
            number:studentCourse.number.toString(),
            user:studentCourse.user,
            course:studentCourse.course,
            courseEscolar:studentCourse.course_escolar,
        })
          showMessage({ type: 'success', message: 'Estudiante Curso Encontrado' })
  
        }else if(await res.status == 404){
          showMessage({ type: 'danger', message: 'El Estudiante Curso no existe' })
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
            placeholder="Digite el numero de curso estudiante"
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
          <View style={styles.styleInput}> 
            <Picker
              selectedValue={this.state.user}
              onValueChange={(itemValue, itemIndex) => this.setState({user: itemValue})}
              style={{width:'100%', height:40}}>
                {
                  this.state.dataUser.map( e => 
                    <Picker.Item key={e.id} label={e.name + ' ' +e.last_name}  value={e.id} />
                    )
                }
            </Picker>
          </View>
            { 'user' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.user[0]}</Text>
              :
              null
            }
          <View style={styles.styleInput}>
            <Picker
              selectedValue={this.state.course}
              onValueChange={(itemValue, itemIndex) => this.setState({course: itemValue})}
              style={{width:'100%', height:40}}>
                {
                  this.state.dataCourse.map( e => 
                    <Picker.Item key={e.id} label={e.name}  value={e.id} />
                    )
                }
            </Picker>
          </View>
          { 'course' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.course[0]}</Text>
              :
              null
            }
          <View style={styles.styleInput}> 
            <Picker
              selectedValue={this.state.courseEscolar}
              onValueChange={(itemValue, itemIndex) => this.setState({courseEscolar: itemValue})}
              style={{width:'100%', height:40}}>
                {
                  this.state.dataCourseEscolar.map( e => 
                    <Picker.Item key={e.id} label={e.start_year+' - '+e.end_year}  value={e.id} />
                    )
                }
            </Picker>
          </View>
          { 'course_escolar' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.courseEscolar[0]}</Text>
              :
              null
            }
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.insertStudentCourse.bind(this)}>
              <Text style={styles.TextStyle}> Insertar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.updateStudentCourse.bind(this)}>
              <Text style={styles.TextStyle}> Actualizar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.deleteStudentCourse.bind(this)}>
              <Text style={styles.TextStyle}> Borrar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getStudentCourseById.bind(this)}>
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
  

