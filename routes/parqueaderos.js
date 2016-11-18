var express = require("express");
var router = express.Router();

router.get("/calif", function (req, res, next) {
    req.db.query("SELECT * FROM parqueaderos", (err, results) => {
      if(err){
          res.send({success:false, parq:null});
      }else{
          if(results.length > 0){
              let prq = results;
              res.send({success:true, parq:prq});
          } else{
              res.send({success:false, parq:null});
          }
      }
    });
});

router.get("/parque/:name", function (req, res, next) {
    req.db.query("SELECT * FROM parqueaderos WHERE nombre LIKE '%"+name+"%'", (err, results) => {
      if(err){
          res.send({success:false, parq:null});
      }else{
          if(results.length > 0){
              let prq = results;
              res.send({success:true, parq:prq});
          } else{
              res.send({success:false, parq:null});
          }
      }
    });
});

  router.post("/cf", function (req, res, next) {
      var body = req.body;
      console.log(cali);
      req.db.query("UPDATE parqueaderos SET calificacion='"+body.calificacion+"' WHERE id = "+body.id, (err, result) => {
          if (err) {
              res.send({ success: false });
          } else {
              res.send({ success: true });
          }
      });
  });

router.post("/caliUser", function (req, res, next) {
  var body = req.body;
    req.db.query("SELECT * FROM calificacion WHERE idUsuario = ?", [body.id], (err, results) => {
      if(err){
          res.send({success:false, parq:null});
      }else{
          if(results.length > 0){
              let prq = results;
              res.send({success:true, parq:prq});
          } else{
              res.send({success:false, parq:null});
          }
      }
    });
});
router.post("/cali", function (req, res, next) {
    var body = req.body;
    var z = "INSERT INTO `calificacion`(`idUsuario`, `idParqueadero`, `calificacion`) VALUES (1,"+body.parqueadero+", "+body.calificacion+")";
    console.log(z);
    req.db.query("INSERT INTO `calificacion`(`idUsuario`, `idParqueadero`, `calificacion`) VALUES (1,"+body.parqueadero+","+body.calificacion+")", (err, results) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
})

router.post("/fava", function (req, res, next) {
    var body = req.body;
    req.db.query("INSERT INTO `preferencias`(id_usuario, id_parqueadero ) VALUES ("+body.id+","+body.parqueadero+")", (err, results) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
})

router.post("/favr", function (req, res, next) {
    var body = req.body;
    console.log("entre al rm");
    console.log("DELETE FROM `preferencias` WHERE id_usuario = "+body.idu+" AND id_parqueadero = "+body.idp);
    var id = req.params.id;
    req.db.query("DELETE FROM `preferencias` WHERE id_usuario = "+body.idu+" AND id_parqueadero = "+body.idp, (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

router.get("/fav", function (req, res, next) {
    req.db.query("SELECT * FROM `preferencias` WHERE id_usuario = 1", (err, results) => {
      if(err){
          res.send({success:false, parq:null});
      }else{
          if(results.length > 0){
              let prq = results;
              res.send({success:true, parq:prq});
          } else{
              res.send({success:false, parq:null});
          }
      }
    });
});

module.exports = router;
