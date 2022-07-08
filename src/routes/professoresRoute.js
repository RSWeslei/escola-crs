const professoresController = require('../controllers/professoresController');

module.exports = (app) => {
    app.get('/professores', professoresController.getAllProfessores);
    app.get('/professores/:id', professoresController.getProfessorById);
    app.delete('/professores/:id', professoresController.deleteProfessorById);
    app.post('/professores', professoresController.persistirProfessores);
}