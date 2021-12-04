import React from 'react';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem,DrawerItemList } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import {navigationRef, navigate} from './src/helpers/navigationRef.js'

import {storage} from './src/services/storage.js'
import { authService }  from './src/services/auth.js'

import StudentComponent from './src/components/student/StudentComponent.js'
import TeacherComponent from './src/components/teacher/TeacherComponent.js'
import DepartmentComponent from './src/components/department/DepartmentComponent.js'
import CourseEscolarComponent from './src/components/courseEscolar/CourseEscolarComponent.js'
import GradeComponent from './src/components/grade/GradeComponent.js'
import CourseComponent from './src/components/course/CourseComponent.js'
import StudentCourseComponent from './src/components/studentCourse/StudentCourseComponent.js'
import Login from './src/components/auth/login.js'
import Logout from './src/components/auth/logout.js'
import AuthLoadingScreen from './src/components/auth/loadingScreen.js'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_token : false
    }
    this.Drawer = createDrawerNavigator()
    
  }

  componentDidMount(){
    this._loadInitialState()//.done()
  }

  _loadInitialState= async ()=>{
    let value = await storage.get('access')
    console.log(value)
    if( value !== null ){
      this.setState({is_token: true})
    }
  }

  logout = async () => {
    let res = await authService.logout()
    console.log(await res.json())
    storage.remove("access")
    this.setState({is_token: false})
    // this.navigation.navigate("Login")
  }

  login = async (email, password) => {
    let res = await authService.login(email,password)
    if(res.status >= 400){
        console.log(await res.json())
    }else if(res.status === 200){
        let data = await res.json()
        let access = data.access
        let refresh = data.refresh
        storage.set("access", access)
        storage.set("refresh", refresh)
        this.setState({is_token: true})
        navigate("Personas",{
            screen:"Modificar"
        })
    }
}

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
      <this.Drawer.Navigator initialRouteName="Personas" >
        { this.props.is_token ? 
          <> 
            <this.Drawer.Screen name="Personas"  component={StudentComponent} />
            <this.Drawer.Screen name="Profesores" component={TeacherComponent} />
            <this.Drawer.Screen name="Cursos" component={CourseComponent} />
            <this.Drawer.Screen name="Grados" component={GradeComponent} />
            <this.Drawer.Screen name="Departamentos" component={DepartmentComponent} />
            <this.Drawer.Screen name="CourseEscolar" component={CourseEscolarComponent} />
            <this.Drawer.Screen name="Estudiantes-Curso" component={StudentCourseComponent} />
            <this.Drawer.Screen name="Logout"  >
              {props => <Logout {...props} logout={this.logout} />}
            </this.Drawer.Screen>
          </>    
          :
            <this.Drawer.Screen name="Login">
              {props => <Login {...props} login={this.login} />}
            </this.Drawer.Screen>
        }
            
        </this.Drawer.Navigator>
      </NavigationContainer>    
      )
  }
}

