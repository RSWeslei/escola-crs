const notasService = require('../services/notasService')

const getAll = async (req, res) => {
    try {
        const alunos = await notasService.getAllNotas();
        res.status(200).send(alunos);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const aluno = await notasService.getNotaById(req.params);
        res.status(200).send(aluno);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteById = async (req, res) => {
    try {
        let deletado = await notasService.deleteNotaById(req.params);
        let msg = deletado 
            ? `Nota ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum aluno com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg });
    } catch (error) {
        res.status(500).send(error)
    }
}

const persistir = async (req, res) => {
    try {
        const msg = await notasService.persistirNotas(req.body);
        res.status(201).send(msg);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getAllNotas = getAll
module.exports.getNotaById = getById
module.exports.deleteNotaById = deleteById
module.exports.persistirNotas = persistir