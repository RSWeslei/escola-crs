const alunosService = require('../services/alunosService')

const getAll = async (req, res) => {
    try {
        const alunos = await alunosService.getAllAlunos();
        res.status(200).send(alunos);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const aluno = await alunosService.getAlunoById(req.params);
        res.status(200).send(aluno);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteById = async (req, res) => {
    try {
        let deletado = await alunosService.deleteAlunoById(req.params);
        let msg = deletado 
            ? `Aluno ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum aluno com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg });
    } catch (error) {
        res.status(500).send(error)
    }
}

const persistir = async (req, res) => {
    try {
        const msg = await alunosService.persistirAlunos(req.body);
        res.status(201).send(msg);
    } catch (error) {
        res.status(500).send(error)
    }
}

const mediaAluno = async (req, res) => {
    try {
        const msg = await alunosService.mediaAluno(req.body);
        res.status(201).send(msg);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getAllAlunos = getAll
module.exports.getAlunoById = getById
module.exports.deleteAlunoById = deleteById
module.exports.persistirAlunos = persistir
module.exports.mediaAluno = mediaAluno