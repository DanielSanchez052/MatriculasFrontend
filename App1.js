import { createAppContainer, createSwitchNavigator } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'

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


const AppStack = createDrawerNavigator({ 
    Personas: StudentComponent, 
    Profesores: TeacherComponent,
    Cursos: CourseComponent,
    Grados: GradeComponent,
    Departamentos: DepartmentComponent,
    CourseEscolar: CourseEscolarComponent,
    Estudiantes_Curso: StudentCourseComponent,
    Logout: Logout
});

const AuthStack = createDrawerNavigator({ 
    Login: Login 
});

export default createAppContainer(
    createSwitchNavigator({
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);