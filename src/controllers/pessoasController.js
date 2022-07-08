const pessoasService = require('../services/pessoasService')

const getAll = async (req, res) => {
    try {
        const pessoas = await pessoasService.getAllPessoas();
        res.status(200).send(pessoas);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const pessoa = await pessoasService.getPessoaById(req.params);
        res.status(200).send(pessoa);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteById = async (req, res) => {
    try {
        let deletada = await pessoasService.deletePessoaById(req.params);
        let msg = deletada 
            ? `Pessoa ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhuma pessoa com o id ${req.params.id} para ser deletada`;
        res.status(200).send({ msg });
    } catch (error) {
        res.status(500).send(error)
    }
}

const persistir = async (req, res) => {
    try {
        const msg = await pessoasService.persistirPessoas(req.body);
        res.status(201).send(msg);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getAllPessoas = getAll
module.exports.getPessoaById = getById
module.exports.deletePessoaById = deleteById
module.exports.persistirPessoas = persistir