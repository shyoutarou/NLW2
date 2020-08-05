import { Router } from 'express'
import ClassesController from './controllers/ClassesControllers'
const routes = Router()


routes.post('/classes', ClassesController.create)
routes.get('/classes', ClassesController.index)

export default routes