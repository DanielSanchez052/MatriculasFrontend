import React from 'react';
import { StyleSheet, Text, View, StatusBar , FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { studentService } from '../../services/student.js'
import ItemStudent from './ItemStudent.js'
import { Feather } from '@expo/vector-icons'; 

export default class ListStudent extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = props.navigation
    this.route = props.route
    this.state = {
      dataSource:[]
    }
  }

  getAllPersons(e){
    studentService.getAll()
      .then( res => this.setState({ dataSource: res })
      )
  }

  getStudents(e){
    studentService.getAll('S')
      .then( res => this.setState({ dataSource: res })
      )
  }

  getTeachers(e){
    studentService.getAll('T')
      .then( res => this.setState({ dataSource: res })
      )
  }
  
  componentDidMount(){
    this.getAllPersons()
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle_xl} onPress={this.getStudents.bind(this)}>
              <Text style={styles.TextStyle}> Estudiantes </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle_sm} onPress={this.getAllPersons.bind(this)}>
              <Text style={styles.TextStyle}> <Feather name="refresh-cw" size={24} color="white" /> </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle_xl} onPress={this.getTeachers.bind(this)}>
              <Text style={styles.TextStyle}> Profesores </Text>
            </TouchableOpacity>
          </View>
            <FlatList
              data={this.state.dataSource}
              keyExtractor={(item) => item.identification_number}
              renderItem={({item}) => 
                  <ItemStudent student={item} />
              }
            />
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    containerButton:{ 
      justifyContent: 'center',
      paddingTop: 2,
      flexWrap:'wrap',
      flexDirection:'row',
    },
  
    TouchableOpacityStyle_sm: {
      padding: 10,
      marginHorizontal:5,
      borderRadius: 5,
      marginBottom: 7,
      width: '15%',
      backgroundColor: '#4CAF50'
    },
    TouchableOpacityStyle_xl: {
      padding: 10,
      borderRadius: 5,
      marginBottom: 7,
      width: '40%',
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
  

