import React from 'react';
import { StyleSheet, Text, View, StatusBar , FlatList, TouchableOpacity } from 'react-native'
import { teacherService } from '../../services/teacher.js'
import ItemTeacher from './ItemTeacher.js'
import { Feather } from '@expo/vector-icons'

export default class ListTeacher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource:[] 
    }
  }
  getTeachers(e){
    this.setState({dataSource:[]})
    teacherService.getAll()
      .then( res => this.setState({ dataSource: res }) )
  }

  componentDidMount(){
    this.getTeachers()
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle_sm} onPress={this.getTeachers.bind(this)}>
              <Text style={styles.TextStyle}> <Feather name="refresh-cw" size={24} color="white" /> </Text>
            </TouchableOpacity>
          </View>
            <FlatList
                style={{marginTop:10}}
                data={this.state.dataSource}
                renderItem={({item}) => 
                  <ItemTeacher key={item.id} teacher={item}/>
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


  

