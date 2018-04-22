const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const publicPath = path.join(__dirname, '..', 'client/public/');
//const pg = require("./config/keys");
//console.log("public: ", publicPath);

const PORT = process.env.PORT || 5000;

//const { Pool } = require("pg");

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
// });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(publicPath));

if (process.env.NODE_ENV === 'production') {
  // Will serve production assets
  app.use(express.static('client/build'));

  // Will serve up index.html if route is not recognized
  const path = require("path");
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.js"));
  });
}

// app.get('*', (req, res) => {
//     console.log("Here", path.join(publicPath));
//     res.sendFile(path.join(publicPath));
// });

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// // Get function that returns all items in the database
// // id, name, reps, weight, date, and lbs(1 for lbs, 0 for kg)
// app.get("/workouts", function(req, res){
//     pg.pool.connect((err, db, done) => {
//         if(err)
//             return res.status(400).send(err);
//         else {
//             db.query("SELECT *, to_char(\"date\", 'MM/DD/YYYY') AS date FROM workouts;", (err, table) => {
//                 done();
//                 if(err)
//                     return res.status(400).send(err);
//                 else {
//                   return res.status(200).send(table.rows);
//                 }
//             });
//         }
//     });
// });

// //Post function that posts workout to the database
// app.post("/new-workout", function (req, res) {
//     const name = req.body.name; 
//     const reps = req.body.reps;
//     const weight = req.body.weight;
//     const lbs = req.body.lbs;
//     const date = req.body.date;

//     const data = [name, reps, weight, lbs, date];

//     pg.pool.connect((err, db, done) => {
//         if(err)
//             return res.status(400).send(err);
//         else {
//             db.query("INSERT INTO workouts (name, reps, weight, lbs, date)" 
//             + "VALUES ($1, $2, $3, $4, $5);", data, (err, table) => {
//                 if (err)
//                     return res.status(400).send(err);
//                 else {
//                     db.end();
//                     res.status(200).send({message: "Data Inserted!"});
//                 }
//             });
//         }
//     });
// });

// // Edits a specific workout in the database
// app.put("/update", function(req, res){
//     const id= req.body.id;
//     const name = req.body.name; 
//     const reps = req.body.reps;
//     const weight = req.body.weight;
//     const lbs = req.body.lbs;
//     const date = req.body.date;

//     const data = [name, reps, weight, date, lbs, id];

//     pg.pool.connect((err, db, done) => {
//         if(err) {
//             console.log(err);
//             return res.status(400).send(err);
//         }
//         else {
//             db.query("UPDATE workouts SET (name, reps, weight, date, lbs) = "
//             + "($1, $2, $3, $4, $5) WHERE id = $6", data, (err, table) => {
//                 if(err) {
//                     console.log(err);
//                     return res.status(400).send(err);
//                 }
//                 else {
//                     db.end();
//                     res.status(200).send({message: "Data Updated!"});
//                 }
//             });
//         }
//     });
// });

// // Deletes a specific workout
// app.delete("/delete-workout/:id", function(req, res){
//     let id = req.params.id;

//     pg.pool.connect((err, db, done) => {
//         if(err) {
//             console.log(err);
//             return status(400).send(err);
//         }
//         else {
//             db.query("DELETE FROM workouts WHERE id = $1", [id], (err, table) => {
//                 if(err) {
//                     return res.status(400).send(err);
//                 }
//                 else {
//                     db.end();
//                     res.status(200).send({message: `Item with id ${id} deleted`});
//                 }
//             })
//         }
//     });
// });

// // Deletes all items from the table
// app.delete("/delete-all/:id", function(req, res){
//     let tableName = req.params.id; 

//     pg.pool.connect((err, db, done) => {
//         if(err) 
//             return res.status(400).send(err);
//         else {
//             db.query(`TRUNCATE table ${tableName}`, (err, table) => {
//                 if(err) 
//                     return res.status(400).send(err);
//                 else {
//                     db.end();
//                     res.status(200).send({message: "All Data Removed"});
//                 }
//             });
//         }
//     })
// });

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
