import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import StudentComponent from '../student/StudentComponent.js'
//import FormTeacher from './src/components/teacher/FormTeacher.js'
import DepartmentComponent from '../department/DepartmentComponent.js'
import GradeComponent from '../grade/GradeComponent.js'

export default class DrawerNavigation extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
  
      this.Drawer = createDrawerNavigator()
  
    }
    render() {
      return (
        <NavigationContainer>
            <this.Drawer.Navigator initialRouteName="Estudiantes" >
                <this.Drawer.Screen name="Estudiantes" component={StudentComponent} />
                <this.Drawer.Screen name="Grados" component={GradeComponent} />
                <this.Drawer.Screen name="Departamentos" component={DepartmentComponent} />
            </this.Drawer.Navigator>
        </NavigationContainer>     
        )
    }
  }
  