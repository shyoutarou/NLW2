import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Landing from './pages/Landing'
import TeacherForm from './pages/TeacherForm'
import TeacherList from './pages/TeacherList'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgetPassword'
import RegisterSuccess from './pages/RegisterSuccess'
import ForgotPasswordSuccess from './pages/ForgotPasswordSucces'
import RedefinePassword from './pages/RedefinePassword'
import RedefinePasswordSuccess from './pages/RedefinePasswordSuccess'

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path='/' exact />
                <Route component={Landing} path='/profile' exact />
                <Route component={Register} path='/register' exact />
                <Route component={RegisterSuccess} path='/register-success' exact />
                <Route component={ForgotPassword} path='/forgot-password' exact />
                <Route component={ForgotPasswordSuccess} path='/forgot-password-success' exact />
                <Route component={RedefinePassword} path='/redefine-password/:id/:token' exact />
                <Route component={RedefinePasswordSuccess} path='/redefine-password-success' exact />
                <Route component={TeacherForm} path='/give-classes' exact />
                <Route component={TeacherList} path='/study' exact />
                <Redirect from='*' to='/' />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes