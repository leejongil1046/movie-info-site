const mysql = require("mysql2");

// 데이터베이스 연결을 위한 설정
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "fakeflix",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 프로미스 기반 쿼리를 위해 promise() 함수 사용
const promisePool = pool.promise();

module.exports = promisePool;
