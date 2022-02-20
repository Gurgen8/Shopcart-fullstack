import express from "express"
import {verifyTokenAndAuthorization,verifyTokenAdmin} from "./verifyToken";
import UserController from "../controller/UserController"
const router=express.Router()

///update-user 
router.put("/:id", verifyTokenAndAuthorization, UserController.updateUser)

///delete-user
router.delete(':id', verifyTokenAndAuthorization, UserController.deleteUser)

///getuser
router.get('/find/:id', verifyTokenAdmin, UserController.getUser)

///get allusers
router.get('/', verifyTokenAdmin, UserController.getAllUsers)

///get user-states
router.get('/states', verifyTokenAdmin, UserController.getState)



export default router