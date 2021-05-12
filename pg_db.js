const Pool=require("pg").Pool;
const pool = new Pool({
    host:"postgres.c3obegeutpvq.us-east-2.rds.amazonaws.com",
    user:"postgres",
    password:"TV8943aa",//
    port:"5432",
    database:"krickey"
    });

    module.exports=pool;