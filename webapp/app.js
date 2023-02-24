let express = require("express");
let bodyParser = require("body-parser");

let mysql = require("mysql");

let dbhost = process.env['DBHOST'] || 'localhost';
let dbPass = process.env['MYSQL_PASSWORD'] || 'mysql';

function getConnection() {
    return mysql.createConnection({
    "host": dbhost,
    "port": 3306,
    "user": "mysql",
    "password": dbPass,
    "database": "mydb"
    });
}

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/registrations', function (req, res) {
    let connection = getConnection();
    connection.connect(function (err) {
        if (err) {
            console.log("Problem connecting to database", err);
            res.send("Unable to connect to database! " + err);
            return;
        }
        console.log("Successful connection!");
        connection.query("SELECT * FROM Registrations", function (err, results) {
            res.send(results);
            connection.destroy();
        });
    });    
});

app.post('/registrations', function (req, res) {
    let connection = getConnection();
    connection.connect(function (err) {
        if (err) {
            console.log("Problem connecting to database", err);
            res.status(500).send("Unable to connect to database! " + err);
            return;
        }
        console.log("Successful connection!");
        
        let reg = req.body;
        if (!(reg.firstName && reg.lastName && reg.grade && reg.email && reg.shirtSize && reg.hrUsername)) {
            res.status(400).send("Validation error, missing required field(s).");
            connection.destroy();
            return;
        }
        if (['S', 'M', 'L'].indexOf(reg.shirtSize) < 0) {
            res.status(400).send("Validation error, bad shirt size (S, M, or L).");
            connection.destroy();
            return;
        } 
        if (reg.grade < 9 || reg.grade > 12) {
            res.status(400).send("Validation error, bad grade (9, 10, 11, or 12).");
            connection.destroy();
            return;
        }

        let insert = `INSERT INTO Registrations VALUES ('${reg.hrUsername}','${reg.firstName}','${reg.lastName}','${reg.grade}','${reg.email}','${reg.shirtSize}')`

        connection.query(insert, function (err, results) {
            if (err) {
                res.status(500).send("Unable to insert record! " + err);
                connection.destroy();
                return;
            }

            res.status(200).send(results);
            connection.destroy();
        });
    });    
});

let port = process.env['PORT'] || 8888;
port = parseInt(port)
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
