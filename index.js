const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // suport req

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao Database", err);
    return;
  }

  console.log('Conectado com Sucesso ao Database');
});

app.post('/user', (req, res) => {
    const { nome, email } = req.body;

    if ( !nome || !email) {
        return res.status(400).json({message: 'Nome e Email são Obrigatórios!'})
    }

    const query = 'INSERT INTO USUARIO(nome, email) VALUE(?,?)';

    db.query(query, [nome, email], (err, result) => {
        if(err){
            console.error('Erro ao inserir dados', err);
            return res.status(500).json({message: 'Erro ao inserir dados', userID: result.insertID});
        }

        res.status(201).json({message: 'Usuário inserido com sucesso'});
    });
});


// server init on port: 3000

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})