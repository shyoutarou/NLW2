import { Router } from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'
import UsersController from './controllers/UsersController'
import auth from './middlewares/auth'
import ProfilesController from './controllers/ProfilesController'

const routes = Router()


routes.post('/classes', ClassesController.create)
routes.get('/classes', ClassesController.index)
routes.post('/connections', ConnectionsController.create)
routes.get('/connections', ConnectionsController.index)
routes.post('/users', UsersController.createUser)
routes.post('/profiles', ProfilesController.loginUser)
routes.post('/profiles/resetpassword', ProfilesController.resetPassword)
routes.put('/profiles/resetpassword/:id', ProfilesController.updatePassword)
routes.post('/auth', auth)

export default routes