import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import colors from 'colors'
import cors from 'cors'
import connectDB from './db/index.js'
import userRouter from './routes/User.routes.js'
import candidateRouter from './routes/Candidate.routes.js'


const app = express()
dotenv.config()
const port = process.env.PORT || 5000
connectDB()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

//Routes
app.use('/api/v1/users',userRouter)
app.use('/api/v1/candidate',candidateRouter)

app.listen(port,() => {
      console.log(`App running on port: ${port}`.bgCyan.white);
})