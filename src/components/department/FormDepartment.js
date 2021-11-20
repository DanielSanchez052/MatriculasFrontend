import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { departmentService } from '../../services/department.js'

export default class FormDepartment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id_department:"",
      name:"",
    }
  }

  cleanInputs(){
    this.setState({
      id_department:"",
      name:"",
    })
  }

  insertDepartment(e){
    departmentService.add({
      name:this.state.name
    })

    this.cleanInputs()
  }

  updateDepartment(e){
    departmentService.edit({
      name:this.state.name
    })
    this.cleanInputs()
  }

  deleteDepartment(e){
    departmentService.delete({
      id_department:this.state.id_department,
    })
    this.cleanInputs()
  }

  getDepartments(e){
    departmentService.getAll()
    this.cleanInputs()
  }
  
  getDepartmentById(e){
    departmentService.getById(this.state.id_department)
    this.cleanInputs()
  }
  
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Departamentos </Text>

          <TextInput
            placeholder="Digite el id"
            onChangeText={textInputValue => this.setState({ id_department: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.id_department}
          />

          <TextInput
            placeholder="Digite el nombre"
            onChangeText={textInputValue => this.setState({ name: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.name}
          />

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
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getDepartments.bind(this)}>
              <Text style={styles.TextStyle}> Listar </Text>
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
      backgroundColor: '#fff'
    },
    containerButton:{ 
      justifyContent: 'center',
      paddingTop: 20,
      flexWrap:'wrap',
      flexDirection:'row',
    },
    styleInput: {
      textAlign: 'center',
      marginBottom: 7,
      height: 40,
      width: '80%',
      borderWidth: 1,
      borderColor: '#8BC34A',
      borderRadius: 5,
    },
    styleInput: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 7,
      height: 40,
      width: '80%',
      borderWidth: 1,
      borderColor: '#8BC34A',
      borderRadius: 5,
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
  

