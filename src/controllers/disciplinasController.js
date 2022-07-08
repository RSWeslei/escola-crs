const disciplinasService = require('../services/disciplinasService')

const getAll = async (req, res) => {
    try {
        const disciplinas = await disciplinasService.getAllDisciplinas();
        res.status(200).send(disciplinas);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const disciplina = await disciplinasService.getDisciplinaById(req.params);
        res.status(200).send(disciplina);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteById = async (req, res) => {
    try {
        let deletado = await disciplinasService.deleteDisciplinaById(req.params);
        let msg = deletado 
            ? `Disciplina ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhuma disciplina com o id ${req.params.id} para ser deletada`;
        res.status(200).send({ msg });
    } catch (error) {
        res.status(500).send(error)
    }
}

const persistir = async (req, res) => {
    try {
        const msg = await disciplinasService.persistirDisciplinas(req.body);
        res.status(201).send(msg);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getAllDisciplinas = getAll
module.exports.getDisciplinaById = getById
module.exports.deleteDisciplinaById = deleteById
module.exports.persistirDisciplinas = persistir