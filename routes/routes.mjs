import express from 'express';
const router = express.Router();
import BookController from '../src/app/controllers/BookController.js';


router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/', BookController.database);
router.get('/disponiveis', BookController.index); //resgatando todos os os valores 
router.get('/books/:id', BookController.show); //resgatando livro específico
router.get('/books', BookController.indexEdit); //resgatando os dados do banco para listar e editar
router.get('/books/edit/:id', BookController.showEdit);//editando um livro específico
router.post('/books/insertbook', BookController.store); //inserindo dados no banco
router.post('/books/updatebook', BookController.update); //modificando um livro no banco de dados
router.post('/books/remove/:id', BookController.delete); //remover um livro

export default router;
