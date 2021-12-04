import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons'

import FormCourseEscolar from './FormCourseEscolar.js'
import ListCourseEscolar from './ListCourseEscolar.js'

export default class CourseEscolarComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
  
      this.Tab = createBottomTabNavigator();
    }
    render() {
      return (
        <NavigationContainer independent={true}>
            <this.Tab.Navigator>
                <this.Tab.Screen 
                  name="Modificar" 
                  component={FormCourseEscolar} 
                  options={{
                    headerShown:false,
                    tabBarLabel: 'Modificar',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="home" color={color} size={size} />
                    ),
                  }}/> 
                <this.Tab.Screen 
                  name="Listar" 
                  component={ListCourseEscolar} options={{
                    headerShown:false,
                    tabBarLabel: 'Listar',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="list" color={color} size={size} />
                    ),
                }} />
            </this.Tab.Navigator>
        </NavigationContainer>
        )
    }
  }