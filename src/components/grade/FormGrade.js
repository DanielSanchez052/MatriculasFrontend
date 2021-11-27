import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
//import {Picker} from '@react-native-picker/picker'
import { gradesService } from '../../services/grades'

export default class FormGrade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      name:"",
    }
  }

  cleanInputs(){
    this.setState({
      number:"",
      name:"",
    })
  }

  insertGrade(e){
    gradesService.add({
      number:parseInt(this.state.number),
      name:this.state.name
    })

    this.cleanInputs()
  }

  updateGrade(e){
    gradesService.edit({
      number:parseInt(this.state.number),
      name:this.state.name
    })
    this.cleanInputs()
  }

  deleteGrade(e){
    gradesService.delete({
      number:parseInt(this.state.number),
    })
    this.cleanInputs()
  }


  getGradeById(e){
    gradesService.getById(parseInt(this.state.number))
      .then(grade => {
        this.setState({  
          number:grade.number.toString(),
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
            placeholder="Digite el numero del grado"
            onChangeText={textInputValue => this.setState({ number: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.number}
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
  

