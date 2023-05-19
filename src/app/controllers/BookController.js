import pool from '../db/User.js';
import BookModel from '../model/BookModel.js';

class BookController {

    // listar tudo
    async index(req, res) {
        const books = await BookModel.findAll();
        res.render('disponiveis', { books });
    }

    //listagem para painel de edição
    async indexEdit(req, res) {
        const books = await BookModel.findAllEdit();
        res.render('books', { books });
    };
    

    //listar tudo por id
    async show(req, res) {
        const id = req.params.id;
        const book = await BookModel.findById(id); 
        res.render('book', { book });
    };


    //listagem por id para fazer o update
    async showEdit(req, res) {
        const id = req.params.id;
        const book = await BookModel.findByIdEdit(id);
        res.render('editbook', { book });
    };

    //inserir dados
    async store(req, res) {
        const title = req.body.title;
        const pageqty = req.body.pageqty;
        const resposta = await BookModel.create(title,pageqty);
        if(resposta == 'true') {
            const recado = true;
            res.render('cadastro', { recado });
        } else {
            res.redirect('/disponiveis');
        };
    };
    

    //atualizar dados (página editar)
    async update(req, res) {
        const id = req.body.id;
        const title = req.body.title;
        const pageqty = req.body.pageqty;
        const resposta = await BookModel.update(id, title, pageqty);
        res.redirect('/books');
    };
    

    //deletar dados (página iniciar)
    async delete(req, res) {
        const id = req.params.id;
        const resultado = await BookModel.delete(id);
        res.redirect('/books');
    };
};

//padrãoa singleton
export default new BookController();