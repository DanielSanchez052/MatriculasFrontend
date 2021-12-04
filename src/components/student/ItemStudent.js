import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default class ItemStudent extends React.Component {
  constructor(props) {
    super(props)
    this.student = props.student
    this.state = {}

  }

 
  render() {
    return (
        <View style={styles.mainCardView}>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            
            <View style={{marginLeft: 12}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                  { this.student.name} { this.student.last_name}
              </Text>
              <View
                style={{ marginTop: 4, borderWidth: 0, width: '100%',
                }}>
                  {  this.student.person_type === 'S' ? 
                    <Text style={{ color: 'gray', fontSize: 12, }}>
                      Estudiante
                    </Text> 
                    :
                    <Text style={{ color: 'gray', fontSize: 12, }}>
                      Profesor
                    </Text> 
                    }
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft: 12}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                  { this.student.identification_number}
              </Text>
              <View
                style={{ marginTop: 4, borderWidth: 0, width: '100%',
                }}>
                  {  this.student.gender === 'M' ? 
                    <Text style={{ color: 'gray', fontSize: 12, }}>
                      Masculino
                    </Text> 
                    :
                    <Text style={{ color: 'gray', fontSize: 12, }}>
                      Femenino
                    </Text> 
                    }
              </View>
            </View>
          </View>
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
    mainCardView: {
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 1,
      shadowColor: '#8C8C8C',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 14,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 16,
      marginRight: 16,
    },
    subCardView: {
      height: 45,
      width: 45,
      borderRadius: 25,
      backgroundColor: '#DCFFD9',
      alignItems: 'center',
      justifyContent: 'center',
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
  

