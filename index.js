import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();

const PORT = 3000;

app.use(express.static("public"));
app.use('/images', express.static('images'));

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/item", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.get('/',(req,res)=>{
    // res.send('this is a GET request at /');
    res.json(data);
})




app.route('/class')
.get((req, res) => {
    // res.send("retrive class info");
    throw new Error();
})
.post((req, res) => {
    res.send('create a new class info');
})
.put((req, res) => {
    res.send('update a class info');
});



// app.get('/class',(req,res)=>{
//     res.send("retrive class info");
// })

// app.post('/class', (req,res)=>{
//     res.send('create a new class');
// })

// app.put('/class', (req,res)=>{
//     res.send('update a class');
// })





app.get('/next',(req,res,next)=>{
    // res.send('this is a GET request at /');
    console.log("the res will be sent by the next function");
    next();
},(req,res)=>{

    res.send('i just set up a route woth a second callback');
}
);

app.get('/redirect',(req,res)=>{
    // res.send('this is a GET request at /');
    res.redirect('https://www.google.com');
})

app.get('/class/:id',(req,res)=>{
    const studentId = Number(req.params.id);

    const student = data.filter((student)=>student.id===studentId);
    res.send(student);
})

app.post('/create', (req,res)=>{
    res.send('this is a POST request at /create');
})

app.put('/edit', (req,res)=>{
    res.send('this is a PUT request at /edit');
})

app.delete('/delete', (req,res)=>{
    res.send('this is a DELETE request at /delete');
})



app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}!`);
    // console.log(data);
})
