import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { courseService } from '../../services/course.js'
import { gradesService } from '../../services/grades.js'
import { teacherService } from '../../services/teacher.js'

export default class FormCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      name:"",
      credit:"",
      type:"",
      course:"",
      quarter:"",
      teacher:"",
      grade:"",
      dataTeacher:[],
      dataGrade:[]
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

  cleanInputs(){
    this.setState({
      number:"",
      name:"",
      credit:"",
      type:"",
      course:"",
      quarter:"",
      teacher:"",
      grade:""
    })
  }

  insertCourse(e){
    courseService.add({
      number: parseInt(this.state.number),
      name:this.state.name,
      credit:this.state.credit,
      type:this.state.type,
      course:this.state.course,
      quarter:this.state.quarter,
      teacher:this.state.teacher,
      grade:this.state.grade
    })

    this.cleanInputs()
  }

  updateCourse(e){
    courseService.edit({
      number: parseInt(this.state.number),
      name:this.state.name,
      credit:this.state.credit,
      type:this.state.type,
      course:this.state.course,
      quarter:this.state.quarter,
      teacher:this.state.teacher,
      grade:this.state.grade
    })
    this.cleanInputs()
  }

  deleteCourse(e){
    courseService.delete({
      number:parseInt(this.state.number),
    })
    this.cleanInputs()
  }

  getDepartments(e){
    courseService.getAll()
    this.cleanInputs()
  }
  
  getCourseById(e){
    courseService.getById(parseInt(this.state.number))
      .then(course => {
        this.setState({
          number:course.number,
          name:course.name,
          credit:course.credit,
          type:course.type,
          course:course.course,
          quarter:course.quarter,
          teacher:course.teacher.id,
          grade:course.grade.id
        })
      })
  }
  
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Cursos </Text>

          <TextInput
            placeholder="Digite el numero del curso"
            onChangeText={textInputValue => this.setState({ number: textInputValue })}
            underlineColorAndroid='transparent'
            
            style={styles.styleInput}
            value={this.state.number}
          />

          <TextInput
            placeholder="Digite el nombre del curso"
            onChangeText={textInputValue => this.setState({ name: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.name}
          />

          <TextInput
            placeholder="Digite los creditos  del curso"
            onChangeText={textInputValue => this.setState({ credit: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.credit}
          />
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

          <TextInput
            placeholder="Digite los el curso"
            onChangeText={textInputValue => this.setState({ course: textInputValue })}
            underlineColorAndroid='transparent'
            
            style={styles.styleInput}
            value={this.state.course}
          />

          <TextInput
            placeholder="Digite el Semestre"
            onChangeText={textInputValue => this.setState({ quarter: textInputValue })}
            underlineColorAndroid='transparent'
            
            style={styles.styleInput}
            value={this.state.quarter}
          />

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
  

