import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connection from './db/connect.js';
import userRouter from './routes/user.route.js';
import chatRouter from './routes/chat.route.js';
const PORT = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user',userRouter)
app.use('/',chatRouter)

const start = ()=>{
    try {
        app.listen(PORT, () => console.log('Server started on port ' + PORT));
        connection()
    } catch (error) {
        console.log(error);
    }
}

start();
