import pool from './config/db.js';

try {
  const [rows] = await pool.query('SELECT NOW()');
  console.log('Conectado! Hora do banco:', rows[0]);
} catch (erro) {
  console.error('Falha na conexão:', erro.message);
}