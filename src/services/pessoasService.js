const db = require('../config/db')

const getAll = async () => {
    const sql = `select * from pessoas;`
    const pessoas = await db.query(sql)
    return pessoas.rows
}

const getById = async (params) => {
    const sql = `select * from pessoas where id = $1;`
    const pessoa = await db.query(sql, [params.id])
    return pessoa.rows[0]
}

const deleteById = async (params) => {
    const sql = `delete from pessoas where id = $1;`
    return (await db.query(sql, [params.id])).rowCount == 1
}

const persistir = async (params) => {
    // insert
    if (!params.id)
    {
        const sql = `INSERT INTO pessoas(
            nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
        const {nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio} = params
        await db.query(sql, [nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio])
        return {
            msg: "Pessoas inserdias com sucesso",
        }
    }

    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update pessoas set ${fields} where id = $1;`

    const response = await db.query(sql, [params.id])

    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`
    
    return { type: 'info', msg }
}

module.exports.getAllPessoas = getAll
module.exports.getPessoaById = getById
module.exports.deletePessoaById = deleteById
module.exports.persistirPessoas = persistir
