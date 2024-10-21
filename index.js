import express from "express"
import mysql from "mysql"

const app = express()
app.use(express.json())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mitch@170319",
    database:"assignment1",
})
app.get("/", (_req,res)=>{
    res.json("hello this is your first_api")
})
app.get("/records", (_req,res)=>{
    const q = "SELECT * FROM records"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
       return res.json(data)
    })
    
   
    
    
})
app.post('/login', (req, res) => {
    

    const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
  // const query = 'SELECT * FROM login WHERE username = ? ';
  const vals=[req.body.username,
    req.body.password
  ]
    db.query(query, [req.body.username,req.body.password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

app.post("/addrecord", (req, res) => {
    //const { name, date, publisher } = req.body;
    const query = "INSERT INTO records (`name`, `date`, `publisher`) VALUES (?)"
       const vals=[req.body.name,
       req.body.date,
       req.body.publisher]    
       
db.query(query, [vals], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Record created', id: results.insertId });
    });
});
app.put('/records/:id', (req, res) => {
    const { name, date, publisher } = req.body;
    const { id } = req.params;
    const query = 'UPDATE records SET name = ?, date = ?, publisher = ? WHERE id = ?';
  
    db.query(query, [name, date, publisher, id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Record updated' });
    });
  });

  app.delete('/records/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM records WHERE id =?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Record deleted' });
    });
  });
 

  
  

app.listen(8800,()=>{
 console.log("connected to myfirst_api2")

});
