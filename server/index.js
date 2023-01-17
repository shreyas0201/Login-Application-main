import express from 'express'
import cors from "cors"
import mongoose from "mongoose";
import dotenv from 'dotenv'

import login from './Controllers/login.js'
import signup from './Controllers/signup.js'
import change_user_data from './Controllers/change.js'
import * as middleware from './middleware/index.js'

const app = express();
dotenv.config();

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.post('/login-check', login)
app.post('/signup-check', signup)
app.post('/change-data', middleware.checkToken, change_user_data)

app.get('/',(req, res) => {
    res.send("it's working....")
})

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);
mongoose.connect( DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))