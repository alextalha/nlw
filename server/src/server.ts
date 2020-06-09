import express, { response, request } from "express";

const app = express();

/* por padrão o express não entende a linguagem json , precisamos avisar a ele  */
/* use funciona como um  plugin para instalar  */
app.use(express.json());

// Rota  : Endereço completo da requisição . as rotas são bem semânticas

// Recurso : Qual a entidade estamos acessando do sistema

//  GET    :  Busca uma ou mais informações do back-end
//  POST   :  Criar uma nova informação do back-end
//  PUT    :  Atualizar uma informação existente do back-end
//  DELETE :  Remover uma informação do back-end

// POST http://localhost:3333/users = Criar uma usuario
// GET http://localhost:3333/users  =  Listar usuário
// GET http://localhost:3333/users/5  =  Listar usuário  específico  com id 5

// Request Params : Parâmetros que vem na própria rota que indentificam um recurso.
// Query Params   : parâmetro que vem na propria rota, geralmente  opcionais para filtro e paginaçãoes, não tão relevantes  , /users?search=on
// Request Body   : Parametros para criação e atualização de informações

//  knex('users').where('name','Alex').select('*')

const users = ["Alex", "Aline", "Nicolas", "Alice"];

app.get("/users", (request, response) => {
  const search = String(request.query.search);
  //return response.json(search);

  const filteresUsers = search
    ? users.filter((user) => user.includes(search))
    : users;
  response.json(filteresUsers);
  //console.log("Listagem de Usuarios");
});

app.post("/users", (request, response) => {
  const data = request.body;

  const user = {
    name: data.nome,
    email: data.email,
  };

  return response.json(user);
});

app.get("/users/:id", (request, response) => {
  const id = Number(request.params.id);
  return response.json(users[id]);
});

app.listen(3333);
