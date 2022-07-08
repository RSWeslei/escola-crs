const db = require('../config/db')

const getAll = async () => {
    const sql = `select * from notas;`
    const notas = await db.query(sql)
    return notas.rows
}

const getById = async (params) => {
    const sql = `select * from notas where id = $1;`
    const nota = await db.query(sql, [params.id])
    return nota.rows[0]
}

const deleteById = async (params) => {
    const sql = `delete from notas where id = $1;`
    return (await db.query(sql, [params.id])).rowCount == 1
}

const persistir = async (params) => {
    // insert
    if (!params.id)
    {
        const sql = `INSERT INTO notas(
            nota, peso, id_disciplina, id_aluno, observacao)
            VALUES ($1, $2, $3, $4, $5);`
        const {nota, peso, id_disciplina, id_aluno, observacao} = params
        await db.query(sql, [nota, peso, id_disciplina, id_aluno, observacao])
        return {
            msg: "Nota inserida com sucesso",
        }
    }

    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update notas set ${fields} where id = $1;`

    const response = await db.query(sql, [params.id])

    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`
    
    return { type: 'info', msg }
}

module.exports.getAllNotas = getAll
module.exports.getNotaById = getById
module.exports.deleteNotaById = deleteById
module.exports.persistirNotas = persistir
