module.exports = app => {
  const { seExiste, seNaoExiste } = app.api.validations

  async function pesquisarUnidadeNAME(nome) {
    const resposta = await app.db('system_unit')
    .where({ name: nome, deleted_at: null })
    .first()

    seNaoExiste(resposta, { name: `Unidade já cadastrada com o nome.` })
  }

  async function pesquisarUnidadeID(id) {
    const resposta = await app.db('system_unit')
      .where({ id: id, deleted_at: null })
      .first()

    seExiste(resposta, `Unidade não encontrada.`)
  }

  return { pesquisarUnidadeID, pesquisarUnidadeNAME }
}