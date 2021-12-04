import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { studentService } from '../../services/student.js'

export default class FormStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialLoad:true,
      identification_number:"",
      email:"",
      name:"",
      last_name:"",
      second_last_name: "",
      city: "",
      direction:"",
      phone_number:"",
      date_born:"",
      gender:"",
      person_type:"", 
      password:"",
      dataSource:[]
    }
  }
  changeInitial(){
    this.setState({initialLoad: false});
  }

  cleanInputs(){
    this.setState({
      identification_number:"",
      email:"",
      name:"",
      last_name:"",
      city: "",
      direction:"",
      phone_number:"",
      date_born:"",
      gender:"",
      person_type:"",
      password:""
    })
  }

  insertStudent(e){
    studentService.add({
      identification_number:this.state.identification_number,
      email: this.state.email,
      name:this.state.name,
      last_name:this.state.last_name,
      city: this.state.city,
      direction:this.state.direction,
      phone_number:this.state.phone_number,
      date_born:this.state.date_born,
      gender:this.state.gender,
      person_type:person.person_type,
      password:this.state.password
    })
    this.cleanInputs()
  }

  updateStudent(e){
    studentService.edit({
      identification_number:this.state.identification_number,
      email: this.state.email,
      name:this.state.name,
      last_name:this.state.last_name,
      city: this.state.city,
      direction:this.state.direction,
      phone_number:this.state.phone_number,
      date_born:this.state.date_born,
      gender:this.state.gender,
      person_type:person.person_type,
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

  EventGetStudentById(e){
    this.cleanInputs()
    this.getStudentById(this.state.identification_number)
  }

  getStudentById(id){
    studentService.getById(id)
      .then(person => {
        this.setState({ 
          identification_number:person.identification_number,
          email: person.email,
          name:person.name,
          last_name:person.last_name,
          city: person.city,
          direction:person.direction,
          phone_number:person.phone_number,
          date_born:person.date_born,
          gender:person.gender,
          person_type:person.person_type,
          password:""
        })
      })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Personas </Text>
          <TextInput
            placeholder="Digite la identificación"
            onChangeText={textInputValue => this.setState({ identification_number:textInputValue })}
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.identification_number}
          />

          <TextInput
            placeholder="Digite El correo Electronico"
            onChangeText={textInputValue => this.setState({ email:textInputValue })}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.email}
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
            keyboardType="number-pad"
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
          <View style={styles.rowViewContainer}>
            <View style={styles.stylePicker}> 
              <Picker
                selectedValue={this.state.gender}
                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
                style={{width:'100%', height:40}}>
                <Picker.Item label='Masculino' value='M' />
                <Picker.Item label='Femenino' value='F' />
              </Picker>
            </View>
            <View style={styles.stylePicker}> 
              <Picker
                selectedValue={this.state.person_type}
                onValueChange={(itemValue, itemIndex) => this.setState({person_type: itemValue})}
                style={{width:'100%', height:40}}>
                <Picker.Item label='Estudiante' value='S' />
                <Picker.Item label='Profesor' value='T' />
              </Picker>
            </View>
          </View>
          <TextInput
            placeholder="Digite la Contraseña"
            onChangeText={textInputValue => this.setState({ password: textInputValue })}
            secureTextEntry={true}
            autoComplete="password"
            underlineColorAndroid='transparent'
            style={styles.styleInput}
            value={this.state.password} />

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
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.EventGetStudentById.bind(this)}>
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
      borderRadius: 10,
      alignSelf: 'center'
    },
    stylePicker: {
      width: '40%',
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
      flexDirection: 'row',
    },
    styleInputRow: {
      textAlign: 'center',
      marginBottom: 7,
      marginHorizontal: 5,
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderColor: '#8BC34A',
      borderRadius: 5,
    },
  
  });
  

