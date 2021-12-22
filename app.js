require("dotenv").config();
const express = require('express');
const app = express();


const adminRouter = require('./api/router/adminRouter');
app.use(express.json());
app.use("/api/users",adminRouter);
 
const port = process.env.portServer || 3000;
app.listen(port,()=>{console.log(`http://localhost:${port}`);});