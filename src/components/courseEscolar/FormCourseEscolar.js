import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import { courseEscolarService } from '../../services/courseEscolar.js'

export default class FormCourseEscolar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number:"",
      start_year:"",
      end_year:"",
    }
  }

  cleanInputs(){
    this.setState({
      number:"",
      start_year:"",
      end_year:"",
    })
  }

  insertCourseEscolar(e){
    courseEscolarService.add({
      number: parseInt(this.state.number),
      start_year:this.state.start_year,
      end_year:this.state.end_year
    })

    this.cleanInputs()
  }

  updateCourseEscolar(e){
    courseEscolarService.edit({
      number: parseInt(this.state.number),
      start_year:this.state.start_year,
      end_year:this.state.end_year
    })
    this.cleanInputs()
  }

  deleteCourseEscolar(e){
    courseEscolarService.delete({
      number:parseInt(this.state.number),
    })
    this.cleanInputs()
  }

  geCourseEscolar(e){
    courseEscolarService.getAll()
    this.cleanInputs()
  }
  
  getCourseEscolarById(e){
    courseEscolarService.getById(parseInt(this.state.number))
      .then(courseEscolar => {
        this.setState({
          number:courseEscolar.number.toString(),
          start_year:courseEscolar.start_year,
          end_year:courseEscolar.end_year,
        })
      })
  }
  
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Curso escolar </Text>

          <TextInput
            placeholder="Digite el numero del curso escolar"
            onChangeText={textInputValue => this.setState({ number: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.number}
          />

          <TextInput
            placeholder="Digite el año de inicio"
            onChangeText={textInputValue => this.setState({ start_year: textInputValue })}
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            style={styles.styleInput}
            value={this.state.start_year ? String(this.state.start_year) : null}
          />

          <TextInput
            placeholder="Digite el año de finalizacion"
            onChangeText={textInputValue => this.setState({ end_year: textInputValue })}
            underlineColorAndroid='transparent'
            keyboardType='number-pad'
            style={styles.styleInput}
            value={this.state.end_year}
          />

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
  

