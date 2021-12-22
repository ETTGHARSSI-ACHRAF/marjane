const {createPool} =require('mysql');
const pool = createPool({
    port:process.env.port,
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    connectionLimit:process.env.connectionLimit
})

module.exports=pool;