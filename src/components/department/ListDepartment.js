import React from 'react';
import { StyleSheet, Text, View, StatusBar , FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { departmentService } from '../../services/department.js'
import ItemDepartment from './ItemDepartment.js'

export default class ListDepartment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource:[]
    }
  }
  getDepartments(e){
    this.setState({dataSource:[]})
    departmentService.getAll()
    .then( res => this.setState({ dataSource: res }) )
  }

  componentDidMount(){
    this.getDepartments()
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle_sm} onPress={this.getDepartments.bind(this)}>
              <Text style={styles.TextStyle}> <Feather name="refresh-cw" size={24} color="white" /> </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{marginTop:10}}
              data={this.state.dataSource}
              renderItem={({item}) => 
                <ItemDepartment department={item}/>
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
  

