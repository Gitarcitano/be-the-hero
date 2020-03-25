const express = require ('express');

const app = express();

app.get('/', (req, resp) => {
  return resp.json({
    evento: 'Semana OmniStack 11.0' ,
    aluno: 'Giovanne Faccio Tarcitano'
  });
});

app.listen(3333);