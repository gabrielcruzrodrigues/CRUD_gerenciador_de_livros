const express = require('express');
const router = express.Router();
const pool = require('../db/User.js');

router.get('/', async (req, res) => {
    res.render('home');
});


router.get('/disponiveis', (req, res) => {
    const sql = `SELECT COUNT(*) as total FROM books`; //verifica o total de itens no db

    pool.query(sql, function(error, results) {
        if (error) {
            console.log(`Error ao executar: ${error}`);
            return;
        };

        const totalItems = results[0].total;

        if (totalItems === null || totalItems === 0) { //verificando o retorno recebido pela query
            const suporteError = [ //array com objetos de suporte, caso a quantidade de itens for nulo ou zero
                {
                    title: 'Nenhum livro foi cadastrado',
                    pageqty: 'Cadastre um livro em [Cadastro]'
                }
            ];

            const books = suporteError;
            console.log(books);
            return res.render('disponiveis', { books });
        } else {
            const SQL = `SELECT * FROM books`; //selecionando todos os itens da tabela books

            pool.query(SQL, function(error, results) {
                if(error) {
                    console.log(`Error ao verificar item do banco. erro: ${error}`);
                    return;
                } else {
                    const books = results;
                    console.log(books);
                    res.render('disponiveis', { books });
                };
            });
        }; 
    });
});

router.get('/cadastro', async (req, res) => {
    res.render('cadastro');
});

//inserindo dados no banco
router.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty;
    const queryAdd = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;
  
    pool.query(queryAdd, function (err) {
        if (err) {
            console.log(err)
            return;
        };
    
        res.redirect('/books');
    });
});

//resgatando os dados do banco
router.get('/books', (req, res) => {
    const queryRead = `SELECT * FROM books`;

    pool.query(queryRead, function (err, data) {
        if (err) {
            console.log(err)
            return;
        };
        
        const books = data;
        res.render('books', { books });
    });
});

//resgatando livro específico
router.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const queryWhere = `SELECT * FROM books WHERE id = ${id}`;
    pool.query(queryWhere, function (err, data) {
        if (err) {
            console.log(err);
            return
        };
    
        const book = data[0];
        res.render('book', { book });
    });
});

//editando um livro específico
router.get('/books/edit/:id', (req, res) => {
    const id = req.params.id;
    const queryEdit = `SELECT * FROM books WHERE id = ${id}`;
    pool.query(queryEdit, function (err, data) {
        if (err) {
            console.log(err);
            return;
        };
    
        const book = data[0];
      res.render('editbook', { book });
    });
});

//modificando um livro no banco de dados
router.post('/books/updatebook', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const pageqty = req.body.pageqty;
    const queryUpdate = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;
  
    pool.query(queryUpdate, function (err) {
        if (err) {
            console.log(err);
            return;
        };
    
        res.redirect('/books');
    });
});

//remover um livro
router.post('/books/remove/:id', (req, res) => {
    const id = req.params.id;
    const queryDelete = `DELETE FROM books WHERE id = ${id}`;
    pool.query(queryDelete, function (err) {
        if (err) {
            console.log(err);
        };
    
        res.redirect('/books');
    });
});

module.exports = router;
