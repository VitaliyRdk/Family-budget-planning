module.exports = {
  getAll,
  getById,
  insert,
  getStatistic,
  modify
};

function insert(req, res, next){
  let token = req.headers.authorization;
  let operation = {
    type: '',
    description: null,
    amount: '',
    level: -1
  };
  operation.type = req.body.type;

  if (operation.type === 'get'){  
    operation.description = req.body.description;
    operation.amount = Number.parseInt(req.body.amount);
    operation.level = req.body.level;
  }else if (operation.type === 'add'){
    operation.amount = Number.parseInt(req.body.amount);
    operation.description = req.body.description;
  }else{
    throw new Error('Incorected type');
  }
  req.app.get('db').query(
    `SELECT * 
     FROM users
     WHERE token = '${token}' LIMIT 1`,
  function (err, rows) {
    if (err) throw err;
    let user = rows ? rows[0] : null;
    if (user){
      req.app.get('db').query(
        `INSERT INTO operations (user_id, type, description, amount, level)
          VALUES ('${user.id}',
          '${operation.type}',
          '${operation.description}',
          '${operation.amount}',
          '${operation.level}')`

      , function (err, rows) {
        if (err) throw err;
        res.status(201).send({id: rows.insertId});
      });
    }else{
      res.status(404).send({error: 'User not found'});
    }
  });
}

function modify(req, res, next){
  let token = req.headers.authorization;
  let operation = {
    type: '',
    description: null,
    amount: '',
    level: -1
  };
  operation.type = req.body.type;

  if (operation.type === 'get'){  
    operation.description = req.body.description;
    operation.amount = Number.parseInt(req.body.amount);
    operation.level = req.body.level;
  }else if (operation.type === 'add'){
    operation.amount = Number.parseInt(req.body.amount);
    operation.description = req.body.description;
  }else{
    throw new Error('Incorected type');
  }
  req.app.get('db').query(
    `SELECT * 
     FROM users
     WHERE token = '${token}' LIMIT 1`,
  function (err, rows) {
    if (err) throw err;
    let user = rows ? rows[0] : null;
    if (user){
      req.app.get('db').query(
        `SELECT * 
         FROM operations
         WHERE id = '${req.params.id}'`
      , function (err, rows) {

        let op = rows[0];
        if (op){
          req.app.get('db').query(
            `UPDATE operations 
             SET type = '${operation.type}',
                 description = '${operation.description}', 
                 amount = ${operation.amount}, 
                 level = ${operation.level}
             WHERE id = ${req.params.id}`
          , function (err, rows) {
            if (err) throw err;

            res.status(200).send({id: req.params.id});
          });
        }else{
          res.status(404).send({error: 'Operation not found'});
        }
      });
      
    }else{
      res.status(404).send({error: 'User not found'});
    }
  });
}

function getById(req, res, next) {
  let token = req.headers.authorization;
  req.app.get('db').query(
    `SELECT * FROM users
     WHERE token = '${token}' LIMIT 1`,
    function (err, rows) {
      if (err) throw err;
      let user = rows ? rows[0] : null;
      if (user){
        req.app.get('db').query(
          `SELECT * FROM operations
           WHERE id = '${req.params.id}'`
        , function (err, rows) {
          if (err) throw err;
          res.status(200).send(rows[0]);
        });
      }else{
        res.status(404).send({error: 'User not found'});
      }
    });
}

function getAll(req, res, next) {
  let token = req.headers.authorization;
  req.app.get('db').query(
    `SELECT * FROM users
     WHERE token = '${token}' LIMIT 1`,
    function (err, rows) {
      if (err) throw err;
      let user = rows ? rows[0] : null;
      if (user){
        req.app.get('db').query(
          `SELECT * FROM operations
           WHERE user_id = '${user.id}'`
        , function (err, rows) {
          if (err) throw err;
          res.status(200).send(rows);
        });
      }else{
        res.status(404).send({error: 'User not found'});
      }
    });
}

function getStatistic(req, res, next) {
  let token = req.headers.authorization;
  req.app.get('db').query(
    `SELECT * FROM users
     WHERE token = '${token}' LIMIT 1`,
    function (err, rows) {
      if (err) throw err;
      let user = rows ? rows[0] : null;
      if (user){
        req.app.get('db').query(
          `SELECT type, 
                  COUNT(1) as count, 
                  level, 
                  SUM(amount) as sum , 
                  MAX(amount) as max, 
                  MIN(amount) as min 
           FROM operations
           WHERE user_id = '${user.id}'
           GROUP BY operations.type, operations.level`
        , function (err, rows) {
          if (err) throw err;
          res.status(200).send(rows);
        });
      }else{
        res.status(404).send({error: 'User not found'});
      }
    });
}
