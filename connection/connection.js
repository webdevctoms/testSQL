const mysql = require('mysql');
const {user,pass} = require('../config');
const {createTableQuery,createUser,createColumnQuery} = require('./dbUtil');

const pool = mysql.createPool({
	host: "localhost",
	user: user,
	password: pass,
	connectionLimit: 10,
  database:'test'
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection){
  	console.log('connected');
  	connection.release();	
  } 
  console.log('finished getting connection',err);
  return;
});

pool.createDb = (dbName) => {
  let promise = new Promise((resolve,reject) => {
    let q = 'CREATE DATABASE ' + dbName;
    pool.query(q,function(err,result){
      if(err){
        console.log('error',err);
        //connection.release();
        reject(err);
      }
      else{
        console.log('created db');
        resolve('db created');
      }
    })
  });

  return promise;
};

pool.createTable = (tableName,queryData) => {
  let promise = new Promise((resolve,reject) => {

    let queryString = createTableQuery(queryData);
    let q = 'CREATE TABLE ' + tableName + ' (id INT AUTO_INCREMENT,' + queryString + ' PRIMARY KEY(id))';
    console.log(q);
    pool.query(q,function(err,result){
      if(err){
        reject(err);
      }
      else{
        resolve('table created');
      }
      
    });
    
  });

  return promise;
};

pool.populateTable = (tableName,amount) => {
  let promise = new Promise((resolve,reject) => {
    let values = [];
    for(let i = 0;i < amount;i++){
      let user = createUser();
      values.push(user);
    }
    let q = 'INSERT INTO ' + tableName + ' (first_name, last_name, email, password, location, dept, is_admin, registered_date) VALUES ?';
    pool.query(q,[values],function(err,result){
      if(err){
        reject(err);
      }
      else{
        resolve(result.affectedRows);
      }
    });
  });

  return promise;
};

pool.getAll = (tableName,columns) => {
  let promise = new Promise((resolve,reject) => {
    let queryString = columns ? createColumnQuery(columns) : '*'
    let q = 'SELECT ' + queryString + ' FROM ' + tableName;
    pool.query(q,function(err,result){
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    });
  });

  return promise;
};

module.exports = {pool};