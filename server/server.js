const express = require("express");
const bodyParser = require("body-parser");

const pg = require("./config/keys")
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Get function that returns all items in the database
// id, name, reps, weight, date, and lbs(1 for lbs, 0 for kg)
app.get("/api/workouts", function(req, res){
    pg.pool.connect((err, db, done) => {
        if(err)
            return res.status(400).send(err);
        else {
            db.query("SELECT *, to_char(\"date\", 'DD/MM/YYYY') AS date FROM workouts;", (err, table) => {
                done();
                if(err)
                    return res.status(400).send(err);
                else {
                    //console.log(table.rows);
                    return res.status(200).send(table.rows);
                }
            });
        }
    });
});

app.post("/api/new-workout", function (req, res) {
    const name = req.body.name; 
    const reps = req.body.reps;
    const weight = req.body.weight;
    const lbs = req.body.lbs;
    const date = req.body.date;

    const data = [name, reps, weight, lbs, date];

    pg.pool.connect((err, db,done) => {
        if(err)
            return res.status(400).send(err);
        else {
            db.query("INSERT INTO workouts (name, reps, weight, lbs, date)" 
            + "VALUES ($1, $2, $3, $4, $5);", data, (err, table) => {
                if (err)
                    return res.status(400).send(err);
                else {
                    console.log("Data Inserted!");
                    db.end();
                    res.status(201).send({message: "Data Inserted!"});
                }
            });
        }
    });

});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
