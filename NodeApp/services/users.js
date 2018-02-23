const md5Helper = require('./../helpers/md5');

module.exports = {
  getAll,
  getById,
  registration,
  authorize
};

function registration(req, res, next){
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  req.app.get('db').query(
    `INSERT INTO users (email, name, hash_password)
     VALUES ('${email}',
       '${name}',
       '${md5Helper.Create(password)}')`
  , 
  function (err, rows) {
    if (err){
      res.status(404).send({error: 'Not valid date'});
    }else{
      res.status(200).send({id: rows.insertId});
    } 
  });
}

function authorize(req, res, next){
  let email = req.body.email;
  let password = req.body.password;
    req.app.get('db').query(
      `SELECT * 
       FROM users
       WHERE email = '${email}' && hash_password = '${md5Helper.Create(password)}' LIMIT 1`,
    function (err, rows) {
      if (err) throw err;
      let user = rows ? rows[0] : null;
      if (user){
        let token = md5Helper.Create(email + password);
        req.app.get('db').query(
          `UPDATE users SET token = '${token}' 
           WHERE email = '${email}'`
        , function (err, rows) {
          if (err) throw err;
          res.status(200).send({token: token});
        });
      }else{
        res.status(404).send({error: 'User not found'});
      }
    });
}

function getById(req, res, next) {
  let id = req.params.id;
  req.app.get('db').query(
    `SELECT * 
     FROM users
     WHERE id = '${id}' LIMIT 100`,
  function (err, rows) {
    if (err) throw err;

    res.status(200).send(rows);
  });
}

function getAll(req, res, next) {
    req.app.get('db').query(
      `SELECT * 
       FROM users LIMIT 100`,
       function (err, rows) {
        if (err) throw err;
    
        res.status(200).send(rows);
      });
}
