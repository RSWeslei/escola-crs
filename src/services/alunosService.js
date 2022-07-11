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
    const sql = `select n.nota, n.peso, p.nome from notas as n
    inner join alunos as al on (n.id_aluno = al.id)
    inner join pessoas as p on (al.id_pessoa = p.id)
    where n.datahora between $1 and $2
    and al.matricula = $3 and n.id_disciplina = $4;`
    let aluno = await db.query(sql, [data_inicial, data_final, matricula, id_disciplina])

    let media = 0, somaPesos = 0
    aluno.rows.forEach((aluno) => {
        media += Number(aluno.nota) * Number(aluno.peso)
        somaPesos += Number(aluno.peso)
    })
    media = media / somaPesos
    let msg = media >= 7 ? 'aprovado!' : media >=5 ? 'recuperacao!' : 'reprovado!'
    msg = `O aluno ${aluno.rows[0].nome} foi ${msg}`
    return {
        media,
        notas: aluno.rows,
        msg
    }  
}

const mediaAlunosPorPeriodo = async (params) => 
{
    const {id_disciplina, data_inicial, data_final} = params

    const sql = `select sum(n.nota * n.peso) as nota, sum(n.peso) as peso, a.id, p.nome from notas as n
    inner join alunos as a on (n.id_aluno = a.id)
    inner join pessoas as p on (a.id_pessoa = p.id)
    where n.id_disciplina = $1 and
    datahora between $2 and $3
    group by a.id, p.nome`
    let notasAlunos = await db.query(sql, [id_disciplina, data_inicial, data_final])
    let alunos = []
    notasAlunos.rows.forEach(aluno => {
        let media = aluno.nota / aluno.peso
        let msg = media >= 7 ? 'Aprovado!' : media >=5 ? 'Recuperacao!' : 'Reprovado!'
        msg = `O aluno ${aluno.nome} foi ${msg}`
        alunos.push({
           id_aluno: aluno.id,
           nome: aluno.nome,
           media,
           id_disciplina,
           msg
        })
    })
    return alunos

    console.log(alunos);
}

module.exports.getAllAlunos = getAll
module.exports.getAlunoById = getById
module.exports.deleteAlunoById = deleteById
module.exports.persistirAlunos = persistir
module.exports.mediaAluno = mediaAluno
module.exports.mediaAlunosPorPeriodo = mediaAlunosPorPeriodo