import express from 'express';
const router=express.Router();
import UserController from '../controllers/schema1userController.js';
import checkuserauth from '../middlewares/auth-middleware.js';


//route level middleware to protect route
//jab user changee pass hit kre ga tu checkuserauth middleware
// pehly chle ga user ki authenticity check krne k liye
router.use('/changepass',checkuserauth)
//ye middlware bnaya takay loggeduser ki profile dikhai ja ske lakin pehly dekhy k authenticate ha b ya ni
router.use('/loggeduser',checkuserauth)

router.post('/registration',UserController.userRegistration)
router.post('/login',UserController.login)
router.post('/senduserpasswordresetemails',UserController.senduserpasswordresetemail)
router.post('/reset-password/:id/:token',UserController.userpasswordreset)

//protected routes
router.post('/changepass',UserController.changepassword)
//yaha get likha q k data retrieve kr rhe yaha
router.get('/loggeduser',UserController.loggedUser)
export default router