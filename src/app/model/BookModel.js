import pool from '../db/User.js';

class BookModel {

    // criar banco de dados
    databaseCreate() {
        const SQL1 = `CREATE TABLE IF NOT EXISTS books (
            id INT(11) NOT NULL AUTO_INCREMENT,
            title VARCHAR(50) NOT NULL,
            pageqty INT(11) DEFAULT NULL,
            PRIMARY KEY(id)
            )`;

        return new Promise((resolve, reject) => {
            pool.query(SQL1, (error) => {
                if (error) {
                    console.log(`Erro ao verificar / criar a tabela: ${error}`);
                };

                return resolve(true);
            });
        });
    };

    //criar novo elemento na tabela
    create(title, pageqty) {
        const queryAdd = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;
        return new Promise((resolve, reject) => {
            pool.query(queryAdd, function (error, result) {
                if (error) {
                    console.log(`Erro ao inserir dados. Error: ${error}`);
                    return;
                };
    
                if (console.log(result));
                return resolve(true);
            });
        })
    };

    //selecionar tudo
    findAll() {
        const sql = `SELECT COUNT(*) as total FROM books`; //verifica o total de itens no db
        return new Promise((resolve, reject) => { //promisse devolvendo um retorno ao controller
            pool.query(sql, function (error, results) {
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
                    return resolve(books);
                } else {
                    const SQL = `SELECT * FROM books`; //selecionando todos os itens da tabela books

                    pool.query(SQL, function (error, results) {
                        if (error) {
                            console.log(`Error ao verificar item do banco. erro: ${error}`);
                            return;
                        } else {
                            const books = results;
                            return resolve(books);
                        };
                    });
                };
            });
        });
    };

    //selecionar tudo para painel de edição
    findAllEdit() {
        const queryRead = `SELECT * FROM books`;
        return new Promise((resolve, reject) => {
            pool.query(queryRead, function (error, data) {
                if (error) {
                    console.log(`erro ao selecionar tudo para a pagina de edição. Error: ${error}`);
                    return;
                };

                const books = data;
                return resolve(books);
            });
        });
    };

    //buscar por id
    findById(id) {
        const queryWhere = `SELECT * FROM books WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            pool.query(queryWhere, function (error, data) {
                if (error) {
                    console.log(`Error ao executar: ${error}`);
                    return;
                };

                const book = data[0];
                return resolve(book);
            });
        })
    };

    findByIdEdit(id) {
        const queryEdit = `SELECT * FROM books WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            pool.query(queryEdit, function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                };
                const book = data[0];
                return resolve(book);
            });
        });
    };


    //atualizar dados
    update(id, title, pageqty) {
        const queryUpdate = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            pool.query(queryUpdate, function (error) {
                if (error) {
                    console.log(`Error ao fazer o update. Error: ${error}`);
                    return;
                };
                return resolve(true);
            });
        })
    };

    //deletar dados
    delete(id) {
        const queryDelete = `DELETE FROM books WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            pool.query(queryDelete, function (err) {
                if (err) {
                    console.log(err);
                };
                return resolve(true);
            });
        });
    };
};

export default new BookModel();