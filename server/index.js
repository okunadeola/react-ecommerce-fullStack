import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import productRoutes from './routes/product.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/order.js'
import stripeRoutes from './routes/stripe.js'
import passwordRoutes from './routes/passwordUpdate.js'


const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());



app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/checkout', stripeRoutes)
app.use('/api/password', passwordRoutes)



mongoose.connect(process.env.SERVER_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 5000       
app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
})

app.get("/", (req, res) => {
  res.send("hello world")
})


















// // mongoose.connect(process.env.SERVER_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// app.listen(PORT, () => console.log(`server running on port ${PORT}`))

// mongoose.connect(process.env.SERVER_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`))).catch((err) => console.log(err.message))

// mongoose.set('useFindAndModify', false)

