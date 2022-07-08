const notasController = require('../controllers/notasController');

module.exports = (app) => {
    app.get('/notas', notasController.getAllNotas);
    app.get('/notas/:id', notasController.getNotaById);
    app.delete('/notas/:id', notasController.deleteNotaById);
    app.post('/notas', notasController.persistirNotas);
}