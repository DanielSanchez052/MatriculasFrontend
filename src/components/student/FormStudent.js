import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity} from 'react-native';
import { studentService } from '../../services/student.js'
export default class FormStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      identification_number:"",
      name:"",
      last_name:"",
      second_last_name: "",
      city: "",
      direction:"",
      phone_number:"",
      date_born:"",
      gender:"",
      password:""
    }
  }
  cleanInputs(){
    this.setState({
      identification_number:"",
      name:"",
      last_name:"",
      second_last_name: "",
      city: "",
      direction:"",
      phone_number:"",
      date_born:"",
      gender:"",
      password:""
    })
  }

  insertStudent(e){
    studentService.add({
      identification_number:this.state.identification_number,
      name:this.state.name,
      last_name:this.state.last_name,
      second_last_name: this.state.second_last_name,
      city: this.state.city,
      direction:this.state.direction,
      phone_number:this.state.phone_number,
      date_born:this.state.date_born,
      gender:this.state.gender,
      password:this.state.password
    })
    this.cleanInputs()
  }

  updateStudent(e){
    studentService.edit({
      identification_number:this.state.identification_number,
      name:this.state.name,
      last_name:this.state.last_name,
      second_last_name: this.state.second_last_name,
      city: this.state.city,
      direction:this.state.direction,
      phone_number:this.state.phone_number,
      date_born:this.state.date_born,
      gender:this.state.gender,
      password:this.state.password
    })
    this.cleanInputs()
  }

  deleteStudent(e){
    studentService.delete({
      identification_number:this.state.identification_number,
    })
    this.cleanInputs()
  }

  getStudents(e){
    studentService.getAll()
    this.cleanInputs()
  }
  
  getStudentById(e){
    studentService.getById(this.state.identification_number)
    this.cleanInputs()
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Estudiantes </Text>
          
          
          <TextInput
            placeholder="Digite la identificación"
            onChangeText={textInputValue => this.setState({ identification_number:textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.identification_number}
          />

          
          <TextInput
            placeholder="Digite el nombre"
            onChangeText={textInputValue => this.setState({ name: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.name}
          />

          
          <TextInput
            placeholder="Digite el Apellido"
            onChangeText={textInputValue => this.setState({ last_name: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.last_name}
          />


          <TextInput
            placeholder="Digite el Segundo Apellido"
            onChangeText={textInputValue => this.setState({ second_last_name: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.second_last_name}
          />

          
          <TextInput
            placeholder="Digite la Ciudad"
            onChangeText={textInputValue => this.setState({ city: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.city}
          />
          
          <TextInput
            placeholder="Digite la Direccion"
            onChangeText={textInputValue => this.setState({ direction: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.direction}
          />

          <TextInput
            placeholder="Digite el Numero de telefono"
            onChangeText={textInputValue => this.setState({ phone_number: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.phone_number}
          />

          <TextInput
            placeholder="Digite la Fecha de nacimiento"
            onChangeText={textInputValue => this.setState({ date_born: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.date_born}
          />
          
          <TextInput
            placeholder="Digite la Genero"
            onChangeText={textInputValue => this.setState({ gender: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.gender}
          />
          
          <TextInput
            placeholder="Digite la Contraseña"
            onChangeText={textInputValue => this.setState({ password: textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.password}
          />
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.insertStudent.bind(this)}>
              <Text style={styles.TextStyle}> Insertar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.updateStudent.bind(this)}>
              <Text style={styles.TextStyle}> Actualizar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.deleteStudent.bind(this)}>
              <Text style={styles.TextStyle}> Borrar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getStudents.bind(this)}>
              <Text style={styles.TextStyle}> Listar </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.getStudentById.bind(this)}>
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
      // borderBottomWidth: 1,
      // borderBottomColor: '#8BC34A',
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
  

