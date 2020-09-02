module.exports = app => {
  function seExiste(valor, msg) {
    if (!valor) throw msg
    if (Array.isArray(valor) && valor.length === 0) throw msg
    if (typeof valor === 'string' && !valor.trim()) throw msg
  }

  function seNaoExiste(valor, msg) {
    try {
      seExiste(valor, msg)
    } catch (msg) {
      return
    }
    throw msg
  }

  function seValorIgual(valorA, valorB, msg) {
    if (valorA !== valorB) throw msg
  }

  function seString(valor, msg) {
    if (typeof valor !== 'string') throw msg
  }

  function seNumber(valor, msg) {
    if (typeof valor !== 'number') throw msg
  }

  function seAtivo(valor, msg) {
    if (valor === 0) throw msg
  }

  return { seExiste, seNaoExiste, seValorIgual, seString, seNumber, seAtivo }
}
