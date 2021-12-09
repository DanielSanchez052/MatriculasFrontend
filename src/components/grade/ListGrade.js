import React from 'react';
import { StyleSheet, Text, View, StatusBar , FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { gradesService } from '../../services/grades.js'
import ItemGrade from './ItemGrade.js'

export default class ListGrade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource:[]
    }
  }
  getGrades(e){
    this.setState({dataSource:[]})
    gradesService.getAll()
    .then( res => this.setState({ dataSource: res }) )
  }


  componentDidMount(){
    this.getGrades()
  }



  render() {
    return (
        <View style={styles.container}>
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle_sm} onPress={this.getGrades.bind(this)}>
              <Text style={styles.TextStyle}> <Feather name="refresh-cw" size={24} color="white" /> </Text>
            </TouchableOpacity>
          </View>
            <FlatList
              style={{marginTop:10}}
              data={this.state.dataSource}
              renderItem={({item}) => 
                <ItemGrade grade={item}/>
              }
          /> 
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    zIndex:1
  },
  containerButton:{ 
    justifyContent: 'flex-end',
    flexWrap:'wrap',
    flexDirection:'row',
    marginRight:10,
    zIndex:10
  },

  TouchableOpacityStyle_sm: {
    position:'absolute',
    top:0,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    
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


