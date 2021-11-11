import User from "../models/user.js"
import cryptoJS from 'crypto-js'
import jwt from "jsonwebtoken";



// export const register = async (req, res) => {
//   const newUser = new User({
//     username: req.body.username,
//     email: req.body.email,
//     password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
//   })
//   try {
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser)

//   } catch (err) {
//     res.status(500).json(err);
//   }
// }



// export const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username })
//     !user && res.status(401).json("Wrong Credentials!")

//     const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
//     const Originalpassword = hashedPassword.toString(cryptoJS.enc.Utf8)
//     Originalpassword !== req.body.password && res.status(401).json("Wrong Credentials!")


//     const accessToken = jwt.sign({
//       id: user._id,
//       isAdmin: user.isAdmin,
//     }, process.env.JWT_SEC, { expiresIn: "1d" })



//     const { password, ...others } = user._doc
//     res.status(200).json({ ...others, accessToken })
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }



export const getPassword = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

export const setPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const realUser = await User.findOne({ email: email })
    !realUser && res.status(401).json("user not found")

    res.status(200).json(email)

  } catch (error) {
    res.status(500).json(error)
  }
}

export const setResetPassword = async (req, res, next) => {
  try {

  } catch (error) {

  }
}
export const getResetPassword = async (req, res, next) => {
  try {

  } catch (error) {

  }
}