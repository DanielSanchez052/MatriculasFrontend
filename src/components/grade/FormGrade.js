import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
//import {Picker} from '@react-native-picker/picker'
import { gradesService } from '../../services/grades'

export default class FormGrade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id_grade:"",
      name:"",
    }
  }

  cleanInputs(){
    this.setState({
      id_grade:"",
      name:"",
    })
  }

  insertGrade(e){
    gradesService.add({
      name:this.state.name
    })

    this.cleanInputs()
  }

  updateGrade(e){
    gradesService.edit({
      name:this.state.name
    })
    this.cleanInputs()
  }

  deleteGrade(e){
    gradesService.delete({
      id_grade:this.state.id_grade,
    })
    this.cleanInputs()
  }

  getGrades(e){
    gradesService.getAll()
    this.cleanInputs()
  }
  
  getGradeById(e){
    gradesService.getById(this.state.id_grade)
      .then(grade => {
        this.setState({
          id_grade:grade.id,
          name:grade.name,
        })
      })
  
  }
  
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Grados </Text>

          <TextInput
            placeholder="Digite el id"
            onChangeText={textInputValue => this.setState({ id_grade: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.id_grade}
          />

          <TextInput
            placeholder="Digite el nombre"
            onChangeText={textInputValue => this.setState({ name: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.name}
          />

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
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getGrades.bind(this)}>
              <Text style={styles.TextStyle}> Listar </Text>
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
  

