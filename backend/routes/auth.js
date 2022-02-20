import express from "express";
import Authentication from "../controller/Authentication";
const router=express.Router()

//register

router.post("/register", Authentication.register)

//login

router.post('/login', Authentication.login)


export default router