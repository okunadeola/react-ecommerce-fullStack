import express from "express"
import { getPassword, getResetPassword, setPassword, setResetPassword } from "../controllers/passwordUpdate.js"
const router = express.Router()



router.get("/forgot-password", getPassword)
router.post("/forgot-password", setPassword)
router.get("/reset-password", getResetPassword)
router.post("/reset-password", setResetPassword)

export default router;