import React from 'react';
import { Alert,StyleSheet, Text, View, ScrollView,TextInput, TouchableOpacity, FlatList } from 'react-native';
import { studentService } from '../../services/student.js'

export default class ItemGrade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

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
            <Text>{this.props.grade.number} - {this.props.grade.name}</Text>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#84CBFF',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

  
    TouchableOpacityStyle: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
      marginBottom: 7,
      width: '45%',
      backgroundColor: '#4CAF50'
    },
  });
  

