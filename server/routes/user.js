import express from "express"
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/userUpdate.js"
import { updateUser, deleteUser, getUser, getAllUsers, usersStats } from "../controllers/user.js"


const router = express.Router()

router.put('/:id', verifyTokenAndAuthorization, updateUser)
router.delete("/:id", verifyTokenAndAdmin, deleteUser)
router.get("/find/:id", verifyTokenAndAdmin, getUser)
router.get("/", verifyTokenAndAdmin, getAllUsers)
router.get("/stats", verifyTokenAndAdmin, usersStats)

export default router 