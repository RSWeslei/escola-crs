const alunosController = require('../controllers/alunosController');

module.exports = (app) => {
    app.get('/alunos', alunosController.getAllAlunos);
    app.get('/alunos/:id', alunosController.getAlunoById);
    app.delete('/alunos/:id', alunosController.deleteAlunoById);
    app.post('/alunos', alunosController.persistirAlunos);
    app.post('/alunos/media-aluno', alunosController.mediaAluno);
    app.post('/alunos/media-aluno-periodo', alunosController.mediaAlunosPorPeriodo);
}