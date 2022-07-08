const db = require('../config/db')

const getAll = async () => {
    const sql = `select * from disciplinas;`
    const disciplinas = await db.query(sql)
    return disciplinas.rows
}

const getById = async (params) => {
    const sql = `select * from disciplinas where id = $1;`
    const disciplina = await db.query(sql, [params.id])
    return disciplina.rows[0]
}

const deleteById = async (params) => {
    const sql = `delete from disciplinas where id = $1;`
    return (await db.query(sql, [params.id])).rowCount == 1
}

const persistir = async (params) => {
    // insert
    if (!params.id)
    {
        const sql = `INSERT INTO disciplinas(
            descricao, id_professor)
            VALUES ($1, $2)`
        const {descricao, id_professor} = params
        await db.query(sql, [descricao, id_professor])
        return {
            msg: "Disciplina inserdias com sucesso",
        }
    }

    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update disciplinas set ${fields} where id = $1;`

    const response = await db.query(sql, [params.id])

    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`
    
    return { type: 'info', msg }
}

module.exports.getAllDisciplinas = getAll
module.exports.getDisciplinaById = getById
module.exports.deleteDisciplinaById = deleteById
module.exports.persistirDisciplinas = persistir
