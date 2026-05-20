import Express  from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import catereres from './routes/caterers.js'
dotenv.config();
const PORT=process.env.PORT;

const app=Express();
app.use(cors('*'));
app.use(Express.json());

app.use('/api/caterers',catereres)

app.listen(PORT,()=>{
    console.log("server running on port ",PORT);
});