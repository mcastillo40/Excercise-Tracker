var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5325);

// Main page with submit button
app.get('/', function (req,res, next){

	res.render('home');
});

// Return informaiton from the database
app.get('/display', function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', 'SELECT DATE_FORMAT("2017-06-15", "%M %d %Y")', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context.results = rows;
    res.send(context);
  });
});

// Insert a new excercise 
app.post('/insert',function(req,res,next){

  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", 
    [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }

 var context = {};
        mysql.pool.query('SELECT * FROM workouts', 'SELECT DATE_FORMAT("2017-06-15", "%M %d %Y")', function(err, rows, fields){
         if(err){
           next(err);
         return;
         }  

         context.results = rows;

         res.send(context);
        });

  });
});

// Update content
app.post('/update',function(req,res,next){
	var context = {};

  	mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if (err){
      next(err);
      return;
    }

    if (result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, 
        req.query.lbs || curVals.lbs, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }

        var context = {};
  		  mysql.pool.query('SELECT * FROM workouts', 'SELECT DATE_FORMAT("2017-06-15", "%M %d %Y")', function(err, rows, fields){
    	   if(err){
      	   next(err);
      	 return;
    	   }  

    	   context.results = rows;

   		   res.send(context);
  		  });

      });
    }
  });
});

// Delete information
app.post('/delete',function(req,res,next){
	var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
  if(err){
    next(err);
      return;
    }

    res.render('home');
  });
});

// Reset the table ... This is not common practice
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
     mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home', context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

