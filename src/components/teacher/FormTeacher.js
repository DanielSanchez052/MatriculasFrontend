import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { teacherService } from '../../services/teacher.js'
import { departmentService } from '../../services/department.js'
import { studentService } from '../../services/student.js'

export default class FormTeacher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      person:"",
      department:"",
      dataDepartment:[],
      dataPerson:[]
    }
  }

  componentDidMount() {
    this.getAllPersons()
    this.getDepartments()
  }

  cleanInputs(){
    this.setState({
      number:"",
      person:"",
      department:"",
    })
  }

  insertTeacher(e){
    teacherService.add({
      number:this.state.number,
      person:this.state.person,
      department:this.state.department,
    })
    this.cleanInputs()
  }

  updateTeacher(e){
    teacherService.edit({
      number:this.state.number,
      person:this.state.person,
      department:this.state.department,

    })
    this.cleanInputs()
  }

  deleteTeacher(e){
    teacherService.delete({
      number:this.state.number,
    })
    this.cleanInputs()
  }
  
  getTeacherById(e){

    teacherService.getById(this.state.number)
      .then(teacher => {
        console.log(teacher.number)
        this.setState({
          number:teacher.number,
          person:teacher.person.id,
          department:teacher.department.id,
        })
      });
  }

  getAllPersons(e){
    studentService.getAll()
      .then( res => this.setState({ dataPerson: res })
      )
  }
  
  getDepartments(e){
    departmentService.getAll()
    .then( res => this.setState({ dataDepartment: res }) )
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Profesores </Text>
          
          <TextInput
            placeholder="Digite el Numero de profesor"
            onChangeText={textInputValue => this.setState({ number: textInputValue })}
            underlineColorAndroid='transparent'
            keyboardType="number-pad"
            style={styles.styleInput}
            value={this.state.number}
          />
          <View style={styles.styleInput}>
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
          
          <View style={styles.styleInput}> 
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
      paddingTop: 20,
      backgroundColor: '#fff',
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
      backgroundColor: '#4CAF50',
      zIndex:2
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
  

