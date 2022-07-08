const pessoasController = require('../controllers/pessoasController');

module.exports = (app) => {
    app.get('/pessoas', pessoasController.getAllPessoas);
    app.get('/pessoas/:id', pessoasController.getPessoaById);
    app.delete('/pessoas/:id', pessoasController.deletePessoaById);
    app.post('/pessoas', pessoasController.persistirPessoas);
}