import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import FormStudent from './src/components/student/FormStudent.js'
//import FormTeacher from './src/components/teacher/FormTeacher.js'
import FormDepartment from './src/components/department/FormDepartment.js'
import FormGrade from './src/components/grade/FormGrade.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.Drawer = createDrawerNavigator();
  }
  render() {
    return (
    <NavigationContainer>
      <this.Drawer.Navigator initialRouteName="Estudiantes">
          <this.Drawer.Screen name="Estudiantes" component={FormStudent} />
          <this.Drawer.Screen name="Grados" component={FormGrade} />
          <this.Drawer.Screen name="Departamentos" component={FormDepartment} />
        </this.Drawer.Navigator>
      </NavigationContainer>        
      )
  }
}

