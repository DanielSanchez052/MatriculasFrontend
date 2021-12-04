import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import {navigationRef, navigate} from './src/helpers/navigationRef.js'

import StudentComponent from './src/components/student/StudentComponent.js'
import TeacherComponent from './src/components/teacher/TeacherComponent.js'
import DepartmentComponent from './src/components/department/DepartmentComponent.js'
import CourseEscolarComponent from './src/components/courseEscolar/CourseEscolarComponent.js'
import GradeComponent from './src/components/grade/GradeComponent.js'
import CourseComponent from './src/components/course/CourseComponent.js'
import StudentCourseComponent from './src/components/studentCourse/StudentCourseComponent.js'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.Drawer = createDrawerNavigator()
    
  }

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <this.Drawer.Navigator initialRouteName="Personas" >
          <this.Drawer.Screen name="Personas"  component={StudentComponent} />
          <this.Drawer.Screen name="Profesores" component={TeacherComponent} />
          <this.Drawer.Screen name="Cursos" component={CourseComponent} />
          <this.Drawer.Screen name="Grados" component={GradeComponent} />
          <this.Drawer.Screen name="Departamentos" component={DepartmentComponent} />
          <this.Drawer.Screen name="CourseEscolar" component={CourseEscolarComponent} />
          <this.Drawer.Screen name="Estudiantes-Curso" component={StudentCourseComponent} />
        </this.Drawer.Navigator>
      </NavigationContainer>    
      )
  }
}

