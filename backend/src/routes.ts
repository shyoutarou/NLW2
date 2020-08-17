import { Router } from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'
import UsersController from './controllers/UsersController'
import ProfilesController from './controllers/ProfilesController'
import FavoritesController from './controllers/FavoritesController'
import auth from './middlewares/auth'
import multer from 'multer'
import multerConfig from './config/multerConfig'

const routes = Router()

const upload = multer(multerConfig)


routes.post('/classes/:id', ClassesController.create)
routes.get('/classes', ClassesController.index)
routes.get('/classes/:id', ClassesController.userClasses)
routes.delete('/classes/:id', ClassesController.deleteClass)
routes.post('/connections', ConnectionsController.create)
routes.get('/connections', ConnectionsController.index)
routes.post('/users', UsersController.createUser)
routes.post('/profiles', ProfilesController.loginUser)
routes.put('/profiles/image/:id', upload.single('avatar'), ProfilesController.updateImage)
routes.put('/profilesupdate/:id', ProfilesController.updateProfile)
routes.post('/profiles/resetpassword', ProfilesController.resetPassword)
routes.put('/profiles/resetpassword/:id', ProfilesController.updatePassword)
routes.post('/auth', auth, ProfilesController.profileAuth)
routes.get('/favorites', FavoritesController.listFavorite)
routes.post('/favorites', FavoritesController.createFavorite)
routes.delete('/favorites/:user/:favorite', FavoritesController.deleteFavorite)

export default routes