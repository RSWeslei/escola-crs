const db = require('../config/db')

const getAll = async () => {
    const sql = `select * from alunos;`
    const alunos = await db.query(sql)
    return alunos.rows
}

const getById = async (params) => {
    const sql = `select * from alunos where id = $1;`
    const aluno = await db.query(sql, [params.id])
    return aluno.rows[0]
}

const deleteById = async (params) => {
    const sql = `delete from alunos where id = $1;`
    return (await db.query(sql, [params.id])).rowCount == 1
}

const persistir = async (params) => {
    // insert
    if (!params.id)
    {
        const sql = `INSERT INTO alunos(
            matricula, id_pessoa)
            VALUES ($1, $2)`
        const {matricula, id_pessoa} = params
        await db.query(sql, [matricula, id_pessoa])
        return {
            msg: "Alunos inserdias com sucesso",
        }
    }

    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update alunos set ${fields} where id = $1;`

    const response = await db.query(sql, [params.id])

    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`
    
    return { type: 'info', msg }
}

const mediaAluno = async (params) =>
{
    const {matricula, id_disciplina, data_inicial, data_final} = params
    const sql = `select n.nota, n.peso from notas as n
    inner join alunos as al on (n.id_aluno = al.id)
    where n.datahora between $1 and $2
    and al.matricula = $3 and n.id_disciplina = $4;`
    let aluno = await db.query(sql, [data_inicial, data_final, matricula, id_disciplina])

    let media = 0, somaPesos = 0
    aluno.rows.forEach((aluno) => {
        media += Number(aluno.nota) * Number(aluno.peso)
        somaPesos += Number(aluno.peso)
    })
    media = media / somaPesos
    let msg = 'Erro'
    if (media >= 7) msg = 'Aprovado'
    else if (media >= 5) msg = 'Recuperacao'
    else if (media < 5) msg = 'Reprovado'
    return {
        msg,
        media,
        notas: aluno.rows
    }  
}

const mediaAlunos = async (params) => 
{

}

module.exports.getAllAlunos = getAll
module.exports.getAlunoById = getById
module.exports.deleteAlunoById = deleteById
module.exports.persistirAlunos = persistir
module.exports.mediaAluno = mediaAluno