const disciplinasController = require('../controllers/disciplinasController');

module.exports = (app) => {
    app.get('/disciplinas', disciplinasController.getAllDisciplinas);
    app.get('/disciplinas/:id', disciplinasController.getDisciplinaById);
    app.delete('/disciplinas/:id', disciplinasController.deleteDisciplinaById);
    app.post('/disciplinas', disciplinasController.persistirDisciplinas);
}