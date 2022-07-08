const professoresService = require('../services/professoresService')

const getAll = async (req, res) => {
    try {
        const professores = await professoresService.getAllProfessores();
        res.status(200).send(professores);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const professor = await professoresService.getProfessorById(req.params);
        res.status(200).send(professor);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteById = async (req, res) => {
    try {
        let deletado = await professoresService.deleteProfessorById(req.params);
        let msg = deletado 
            ? `Professor ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum professor com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg });
    } catch (error) {
        res.status(500).send(error)
    }
}

const persistir = async (req, res) => {
    try {
        const msg = await professoresService.persistirProfessores(req.body);
        res.status(201).send(msg);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getAllProfessores = getAll
module.exports.getProfessorById = getById
module.exports.deleteProfessorById = deleteById
module.exports.persistirProfessores = persistir