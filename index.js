
//docker build -t krickey-web . ?Not needed
//docker run -it -p 9000:8080 krickey-web
//http://localhost:9000/Maha    ---> Will give Maha's sales
//http://localhost:9000/        ---> Will retturn all authors with Id


app =express();
const pool= require("./pg_db");
const notFound = require('./notFound')
  
app.use(express.json());

app.get('/', async(req, res)=>{
    try{
        const defaultOp=await pool.query(`select author_id,sum(item_price*quantity) revenue \
        from sale_items join books on sale_items.book_id=books.id \
        join authors on books.author_id=authors.id group by author_id \
        order by revenue DESC limit 10`);
        res.json(defaultOp.rows);
    }catch(err){
        res.send(err.message,err.statusCode);
        console.error(err.message,err.statusCode);
    }
});

app.get('/:name', async(req, res)=>{
    const name=req.params.name;
    try{
        console.log(name);
        const defaultOp=await pool.query(`select sum(item_price*quantity) from sale_items \
        where book_id in (select id from books where author_id= (select id from authors where name = $1))`,[name]);
        console.log(defaultOp.rows);
        if(defaultOp.rows[0]["sum"]==null){
            throw new notFound('Author not Found !')
        }
        else{
            
        res.json(defaultOp.rows);
    }
    }catch(err){
        res.send(err.message,err.statusCode);
        console.error(err.message,err.statusCode);
    }
});

app.listen(8080,()=>{
    console.log("server in running!!");
});
//docker run -it -p 9000:8080 krickey-web
//http://localhost:9000/Maha    ---> Will give Maha's sales
//http://localhost:9000/        ---> Will retturn all authors with Id