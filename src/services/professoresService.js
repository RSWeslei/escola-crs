const db = require('../config/db')

const getAll = async () => {
    const sql = `select * from professores;`
    const professores = await db.query(sql)
    return professores.rows
}

const getById = async (params) => {
    const sql = `select * from professores where id = $1;`
    const professor = await db.query(sql, [params.id])
    return professor.rows[0]
}

const deleteById = async (params) => {
    const sql = `delete from professores where id = $1;`
    return (await db.query(sql, [params.id])).rowCount == 1
}

const persistir = async (params) => {
    // insert
    if (!params.id)
    {
        const sql = `INSERT INTO professores(
            matricula, id_pessoa)
            VALUES ($1, $2)`
        const {matricula, id_pessoa} = params
        await db.query(sql, [matricula, id_pessoa])
        return {
            msg: "Professor inserido com sucesso",
        }
    }

    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update professores set ${fields} where id = $1;`

    const response = await db.query(sql, [params.id])

    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`
    
    return { type: 'info', msg }
}

module.exports.getAllProfessores = getAll
module.exports.getProfessorById = getById
module.exports.deleteProfessorById = deleteById
module.exports.persistirProfessores = persistir
