import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

export default class ItemDepartment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  } 

  render() {
    return (
        <View style={styles.mainCardView}>
          <TouchableWithoutFeedback onPress={this.props.onPress}>
            <View style={styles.subCardView}>
              <Text>{ this.props.department.number }</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft: 12}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                  { this.props.department.name }
              </Text>
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
                }}></Text>
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
      width: '30%',
      borderRadius: 15,
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