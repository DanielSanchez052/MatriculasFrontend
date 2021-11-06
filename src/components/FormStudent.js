import React from 'react';
import { Alert,StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        textInput_identification_number:"",
        textInput_name:"",
        textInput_last_name:"",
        textInput_second_last_name: "",
        textInput_city: "",
        textInput_direction:"",
        textInput_phone_number:"",
        textInput_date_born:"",
        textInput_gender:"",
        textInput_password:""
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Administrar Estudiantes </Text>
        
        <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 7 }}> identificación: {this.state.textInput_identification_number} </Text>
        <TextInput
          placeholder="Digite la identificación"
          onChangeText={textInputValue => this.setState({ textInput_identification_number: textInputValue })}
          underlineColorAndroid='transparent'
          style={styles.styleInput}
          value={this.state.textInput_identification_number}
        />

        <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 7 }}> Nombre: {this.state.textInput_name} </Text>
        <TextInput
          placeholder="Digite el nombre"
          onChangeText={textInputValue => this.setState({ textInput_name: textInputValue })}
          underlineColorAndroid='transparent'
          style={styles.styleInput}
          value={this.state.textInput_name}
        />

        <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 7 }}> Apellido: {this.state.textInput_last_name} </Text>
        <TextInput
          placeholder="Digite el Apellido"
          onChangeText={textInputValue => this.setState({ textInput_last_name: textInputValue })}
          underlineColorAndroid='transparent'
          style={styles.styleInput}
          value={this.state.textInput_last_name}
        />

        <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 7 }}> Segundo Apellido: {this.state.textInput_second_last_name} </Text>
        <TextInput
          placeholder="Digite el Segundo Apellido"
          onChangeText={textInputValue => this.setState({ textInput_second_last_name: textInputValue })}
          underlineColorAndroid='transparent'
          style={styles.styleInput}
          value={this.state.textInput_second_last_name}
        />

        <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 7 }}> Ciudad: {this.state.textInput_city} </Text>
        <TextInput
          placeholder="Digite la Ciudad"
          onChangeText={textInputValue => this.setState({ textInput_city: textInputValue })}
          underlineColorAndroid='transparent'
          style={styles.styleInput}
          value={this.state.textInput_city}
        />
        <View style={styles.containerButton}>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertarEstudiante}>
            <Text style={styles.TextStyle}> Insertar </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.ActualizarEstudiante}>
            <Text style={styles.TextStyle}> Actualizar </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.BorrarEstudiante}>
            <Text style={styles.TextStyle}> Borrar </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.listarEstudiantes}>
            <Text style={styles.TextStyle}> Listar </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.listarEstudiantes}>
            <Text style={styles.TextStyle}> Buscar </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    on: {
      width: 100,
      height: 100,
      backgroundColor: 'green'
    },
  
    off: {
      width: 100,
      height: 100,
      backgroundColor: 'red'
    },
  
    container: {
      alignItems: 'center',
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#fff'
    },
    containerButton:{ 
      justifyContent: 'center',
      paddingTop: 30,
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
  

