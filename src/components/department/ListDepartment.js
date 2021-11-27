import React from 'react';
import { StyleSheet, Text, View, StatusBar , FlatList } from 'react-native';
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
    departmentService.getAll()
    .then( res => this.setState({ dataSource: res }) )
  }

  componentDidMount(){
    this.getDepartments()
  }

  render() {
    return (
        <View style={styles.container}>
            <FlatList
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
  

