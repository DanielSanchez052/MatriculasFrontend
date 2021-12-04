import React from 'react'
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { studentCourse } from '../../services/studentCourse.js'
import { studentService } from '../../services/student.js'
import { courseService } from '../../services/course.js'
import { courseEscolarService } from '../../services/courseEscolar.js'


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
    }
  }

  componentDidMount() {
    this.getAllPersons()
    this.getCourses()
    this.getcourseEscolar()
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
      .then( res => { this.setState({ dataUser: res }) })
  }

  cleanInputs(){
    this.setState({
      number:"",
      user:"",
      course:"",
      courseEscolar:"",
    })
  }

  insertCourseEscolar(e){
    studentCourse.add({
      number: parseInt(this.state.number),
      user:this.state.user,
      course:this.state.course,
      courseEscolar:this.state.courseEscolar,
    })

    this.cleanInputs()
  }

  updateCourseEscolar(e){
    studentCourse.edit({
      number: parseInt(this.state.number),
      user:this.state.user,
      course:this.state.course,
      courseEscolar:this.state.courseEscolar,
    })
    this.cleanInputs()
  }

  deleteCourseEscolar(e){
    studentCourse.delete({
      number:parseInt(this.state.number),
    })
    this.cleanInputs()
  }

  geCourseEscolar(e){
    studentCourse.getAll()
    this.cleanInputs()
  }
  
  getCourseEscolarById(e){
    studentCourse.getById(parseInt(this.state.number))
      .then(studentCourse => {
          this.setState({
            number:studentCourse.number.toString(),
            user:studentCourse.user,
            course:studentCourse.course,
            courseEscolar:studentCourse.course_escolar,
        })
      })
  }
  
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Estudiantes por Curso </Text>

          <TextInput
            placeholder="Digite el numero de curso estudiante"
            onChangeText={textInputValue => this.setState({ number: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.number}
          />

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
  
    rowViewContainer: {
      fontSize: 20,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    }
  
  });
  

