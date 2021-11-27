import React from 'react';
import { StyleSheet, Text, View, StatusBar , FlatList } from 'react-native';
import { studentService } from '../../services/student.js'
import ItemStudent from './ItemStudent.js'

export default class ListStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource:[]
    }
  }

  getStudents(e){
    studentService.getAll()
      .then( res => this.setState({ dataSource: res })
      )
  }
  
  componentDidMount(){
    this.getStudents()
  }

//   getStudentById(e){
//     studentService.getById(this.state.identification_number)
//       .then(person => {
//         this.setState({ 
//           identification_number:person.identification_number,
//           email: person.email,
//           name:person.name,
//           last_name:person.last_name,
//           city: person.city,
//           direction:person.direction,
//           phone_number:person.phone_number,
//           date_born:person.date_born,
//           gender:person.gender,
//           person_type:person.person_type,
//           password:"",
//         })
//       })
//   }

  render() {
    return (
        <View style={styles.container}>
            <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => 
                  <ItemStudent student={item}/>
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
  

