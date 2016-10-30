var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET insert page. */
router.get('/insert', function (req, res) {
    res.render('insert', { title: 'Aggiungi nuovo utente' });
});

/* POST to Add User Service */
router.post('/insertData', function (req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var nome = req.body.nome;
    var cognome = req.body.cognome;

    // Set our collection
    //var persona = db.get('Persona');

    // Submit to the DB
    db.serialize(function () {

        var stmt = db.prepare("INSERT INTO Persona (nome, cognome) VALUES (?, ?)");
        this.nome = nome;
        this.cognome = cognome;

        stmt.finalize();
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            //res.location("userlist");
            // And forward to success page
            res.redirect("insert");
        }
    });
});

module.exports = router;