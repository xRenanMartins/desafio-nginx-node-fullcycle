const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'people_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao db: ', err);
    process.exit(1);
  }
  console.log('Conectado ao banco');
});

app.get('/', (req, res) => {
    const sql = `INSERT INTO people(name) VALUES ('Renan')`;
    connection.query(sql, (err) => {
      if (err) {
        console.error('Erro ao inserir dados: ', err);
        res.status(500).send('Erro ao inserir dados');
        return;
      }
    });

    connection.query('SELECT name FROM people', (err, results) => {
      if (err) {
        console.error('Erro ao buscar dados: ', err);
        res.status(500).send('Erro ao buscar dados');
        return;
      }

      let namesList = '<ul>';
      results.forEach(row => {
        namesList += `<li>${row.name}</li>`;
      });
      namesList += '</ul>';

      res.send(`<h1>Full Cycle Rocks!</h1> ${namesList}`);
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
