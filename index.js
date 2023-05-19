import express from 'express';
import exphbs from 'express-handlebars';
import routes from './routes/routes.mjs';
const port = 3000;

//chmando a função express()
const app = express();

//middlewares para conseguir ter acesso ao body pelo json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//conectando o css pelo express
app.use(express.static('public'));

//definindo o handlebars como template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//rotas
app.use('/',routes);

//ligando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
