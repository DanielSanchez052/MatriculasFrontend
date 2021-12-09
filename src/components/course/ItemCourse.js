import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default class ItemCourse extends React.Component {
  constructor(props) {
    super(props)
    this.course = this.props.course
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
                  textAlign:'center'
                }}>{this.course.number}</Text>
                <View
                style={{ marginTop: 4, borderWidth: 0, width: '100%',
                }}>
                  <Text style={{ color: 'gray', fontSize: 12,textAlign:'center' }}>{ this.course.name}</Text> 
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
      justifyContent: 'center',
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