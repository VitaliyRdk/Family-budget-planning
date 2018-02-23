const mysql = require('mysql');

const config = {
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'family-budget'
}

module.exports = function(app) {

  /*const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'family-budget'
  });

  connection.connect();
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();                        
    } else {                                     
      throw err;                                 
    }
  });*/
  
  var connection;
  
  function handleDisconnect() {
    connection = mysql.createConnection(config); 
  
    connection.connect(function(err) {              
      if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                     
    });                                    
                  
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
      } else {                                      
        throw err;                                
      }
    });
  }
  
  handleDisconnect();

  app.set('db', connection);
};
