import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import TeacherForm from './pages/TeacherForm'
import TeacherList from './pages/TeacherList'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Landing} path='/' exact />
            <Route component={TeacherForm} path='/give-classes' exact />
            <Route component={TeacherList} path='/study' exact />
        </BrowserRouter>
    )
}

export default Routes