import React from 'react';
import { StyleSheet, Text, View, StatusBar , FlatList } from 'react-native';
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
    gradesService.getAll()
    .then( res => this.setState({ dataSource: res }) )
  }


  componentDidMount(){
    this.getGrades()
  }



  render() {
    return (
        <View style={styles.container}>
            <FlatList
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
  

