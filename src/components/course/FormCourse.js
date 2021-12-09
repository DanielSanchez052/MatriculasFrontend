import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { showMessage, hideMessage  } from "react-native-flash-message"

import { courseService } from '../../services/course.js'
import { gradesService } from '../../services/grades.js'
import { teacherService } from '../../services/teacher.js'
import {validators} from '../../helpers/validators'

export default class FormCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      name:"",
      credit:"",
      type:"B",
      course:"",
      quarter:"",
      teacher:"",
      grade:"",
      dataTeacher:[],
      dataGrade:[],
      errors:[]
    }
  }

  componentDidMount() {
    this.getGrades()
    this.getTeachers()
  }

  getGrades(e){
    gradesService.getAll()
    .then( res => this.setState({ dataGrade: res }) )
  }

  getTeachers(e){
    teacherService.getAll()
      .then( res => this.setState({ dataTeacher: res }) )
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

  cleanInputs(error=0){
    this.setState({
      number:"",
      name:"",
      credit:"",
      type:"B",
      course:"",
      quarter:"",
      teacher:"",
      grade:""
    })
    error === 0 
    ?
    this.setState({errors:[]})
    :
    null
  }

  insertCourse = async (e) => {
    try{
      let res = await courseService.add({
        number: parseInt(this.state.number),
        name:this.state.name,
        credit:this.state.credit,
        type:this.state.type,
        course:this.state.course,
        quarter:this.state.quarter,
        teacher:this.state.teacher,
        grade:this.state.grade
      })
      if(res.ok){
        showMessage({ type: 'success', message: 'Insertado correctamente' })
        this.cleanInputs()
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: "Error al insertar el Curso"})
        this.setState({ errors: error })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs(1)
  }

  updateCourse = async (e) => {
    try{
      let res = await courseService.edit({
        number: parseInt(this.state.number),
        name:this.state.name,
        credit:this.state.credit,
        type:this.state.type,
        course:this.state.course,
        quarter:this.state.quarter,
        teacher:this.state.teacher,
        grade:this.state.grade
      })
      
      if(res.ok){
        showMessage({ type: 'success', message: 'Actualizado correctamente' })
        this.cleanInputs()
      }else if(res.status == 404){
        showMessage({ type: 'danger', message: 'El Curso no existe' })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: "Error al actualizar el curso" })
        this.setState({ errors: error })
      }
    }catch (error) {
      console.log(error)
      showMessage({ type: 'danger', message: 'Error' })
    }
  }

  deleteCourse = async (e) => {
    try{
      let res = await courseService.delete({
        number:parseInt(this.state.number),
      })
      if(res.ok){
        showMessage({ type: 'success', message: "Eliminado Correctamente"})
      }else if(await res.status == 404){
        let error = await res.json()
        showMessage({ type: 'danger', message: error.message })
      }else{
        let error = await res.json()
        showMessage({ type: 'danger', message: 'Error al eliminar el Profesor' })
      }
    }catch (error) {
      showMessage({ type: 'danger', message: 'Error' })
    }
    this.cleanInputs()
  }

  getDepartments(e){
    courseService.getAll()
    this.cleanInputs()
  }
  
  getCourseById = async (e) => {
      try{
        this.cleanInputs()
        let res = await courseService.getById(parseInt(this.state.number))
        if(await res.status == 200){
          let course = await res.json()
          this.setState({
            number:String(course.number),
            name:course.name,
            credit:String(course.credit),
            type:course.type,
            course:String(course.course),
            quarter:String(course.quarter),
            teacher:course.teacher.id,
            grade:course.grade.id
          })
          showMessage({ type: 'success', message: 'Curso Encontrado' })
  
        }else if(await res.status == 404){
          showMessage({ type: 'danger', message: 'El Curso no existe' })
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
            placeholder="Digite el numero del curso"
            onChangeText={textInputValue => this.validateNumber(textInputValue, 'number')}
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
            placeholder="Digite el nombre del curso"
            onChangeText={textInputValue => this.validateText(textInputValue, 'name')}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.name}
          />
            { 'name' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.name[0]}</Text>
              :
              null
            }
          <TextInput
            placeholder="Digite los creditos  del curso"
            onChangeText={textInputValue => this.validateNumber(textInputValue, 'credit')}
            underlineColorAndroid='transparent'
            keyboardType="number-pad"
            style={styles.styleInput}
            value={this.state.credit}
          />
          { 'credit' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.credit[0]}</Text>
              :
              null
            }
          <View style={styles.styleInput}> 
            <Picker
              selectedValue={this.state.type}
              onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}
              style={{width:'100%', height:40}}>
              <Picker.Item label='Basico' value='B' />
              <Picker.Item label='Requerido' value='R' />
              <Picker.Item label='Opcional' value='O' />
            </Picker>
          </View>
          { 'type' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.type[0]}</Text>
              :
              null
            }
          <TextInput
            placeholder="Digite los el curso"
            onChangeText={textInputValue => this.validateNumber(textInputValue, 'course')}
            underlineColorAndroid='transparent'
            keyboardType="number-pad"
            style={styles.styleInput}
            value={this.state.course}
          />
            { 'course' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.course[0]}</Text>
              :
              null
            }
          <TextInput
            placeholder="Digite el Semestre"
            onChangeText={textInputValue => this.validateNumber(textInputValue, 'quarter')}
            underlineColorAndroid='transparent'
            keyboardType="number-pad" 
            style={styles.styleInput}
            value={this.state.quarter}
          />
          { 'quarter' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.quarter[0]}</Text>
              :
              null
            }

          <View style={styles.styleInput}> 
            <Picker
              selectedValue={this.state.teacher}
              onValueChange={(itemValue, itemIndex) => this.setState({teacher: itemValue})}
              style={{width:'100%', height:40}}>
                {
                  this.state.dataTeacher.map( e => 
                    <Picker.Item key={e.id} label={e.person.name+' '+e.person.last_name} value={e.id} />
                    )
                }
            </Picker>
          </View>
          { 'teacher' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.teacher[0]}</Text>
              :
              null
            }
          <View style={styles.styleInput}> 
            <Picker
              selectedValue={this.state.grade}
              onValueChange={(itemValue, itemIndex) => this.setState({grade: itemValue})}
              style={{width:'100%', height:40}}>
                {
                  this.state.dataGrade.map( e => 
                    <Picker.Item key={e.id} label={e.name}  value={e.id} />
                    )
                }
            </Picker>
          </View>
          { 'grade' in this.state.errors ? 
              <Text style={styles.error}>{this.state.errors.grade[0]}</Text>
              :
              null
            }
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.insertCourse.bind(this)}>
              <Text style={styles.TextStyle}> Insertar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.updateCourse.bind(this)}>
              <Text style={styles.TextStyle}> Actualizar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.deleteCourse.bind(this)}>
              <Text style={styles.TextStyle}> Borrar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getCourseById.bind(this)}>
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
  

