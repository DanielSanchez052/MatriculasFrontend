import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons'

import FormDepartment from './FormDepartment.js'
import ListDepartment from './ListDepartment.js'

export default class DepartmentComponent extends React.Component {
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
                  component={FormDepartment} 
                  options={{
                    headerShown:false,
                    tabBarLabel: 'Modificar',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="home" color={color} size={size} />
                    ),
                  }}/> 
                <this.Tab.Screen 
                  name="Listar" 
                  component={ListDepartment} options={{
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