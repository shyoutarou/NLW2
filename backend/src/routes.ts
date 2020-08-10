import { Router } from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'
import UsersController from './controllers/UsersController'

const routes = Router()


routes.post('/classes', ClassesController.create)
routes.get('/classes', ClassesController.index)
routes.post('/connections', ConnectionsController.create)
routes.get('/connections', ConnectionsController.index)
routes.post('/users', UsersController.createUser)
routes.post('/users/login', UsersController.loginUser)

export default routes