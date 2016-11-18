var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    req.db.query("SELECT * FROM usuarios", (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post("/id", function (req, res, next) {
  var body = req.body;
    req.db.query("SELECT id FROM usuarios WHERE user = ?", [body.user], (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send({id: results[0].id});
        }
    });
});

router.get("/:id", function (req, res, next) {
    var id = req.params.id;
    req.db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta" });
        } else {
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.status(500).send({ msg: "Usuario no encontrado" });
            }
        }
    });
});

router.get("/user/:usr", function (req, res, next) {
    var usr = req.params.usr;
    req.db.query("SELECT * FROM usuarios WHERE user = ?", [usr], (err, results) => {
        if (err) {
            res.send({success:false, valid:false });
        } else {
            if (results.length > 0) {
                res.send({success:true, valid:false });
            } else {
                res.send({success:true, valid:true });
            }
        }
    });
});

router.post("/", function (req, res, next) {
    var body = req.body;
    req.db.query("INSERT INTO usuarios SET ?", body, (err, results) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
})

router.put("/:id", function (req, res, next) {
    var body = req.body;
    var id = req.params.id;
    req.db.query("UPDATE usuarios SET ? WHERE idUsuario = ?", [body, id], (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

router.delete("/:id", function (req, res, next) {
    var id = req.params.id;
    req.db.query("DELETE FROM usuarios WHERE idUsuario = ?", [id], (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

router.post("/login",(req,res,next)=>{
    let body = req.body;
    req.db.query("SELECT * FROM usuarios WHERE user = ? AND password = ?", [body.user, body.password],(err, results)=>{
        if(err){
            res.send({success:false});
        }else{
            if(results.length > 0){
                let usr = results[0];
                //Encriptar CryptoJS
                //Para crear token de sesion es JSONToken
                delete usr.password;
                //delete usr.user;
                res.send({success:true, user:usr});

            } else{
                res.send({success:false});
            }
        }
    })
})

module.exports = router;
