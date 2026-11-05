const CAMPOS_PRODUTO = ['nome', 'descricao', 'preco', 'quantidade_estoque', 'categoria_id'];

export function validarProduto(req, res, next) {
    const { nome, preco, quantidade_estoque, categoria_id } = req.body;
    const erros = [];

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
        erros.push('nome é obrigatório e deve ser um texto');
    }

    if (preco === undefined || preco === null || typeof preco !== 'number' || preco <= 0) {
        erros.push('preco é obrigatório e deve ser um número maior que zero');
    }

    if (quantidade_estoque !== undefined && (typeof quantidade_estoque !== 'number' || quantidade_estoque < 0)) {
        erros.push('quantidade_estoque deve ser um número maior ou igual a zero')
    }

    if (categoria_id !== undefined && categoria_id !== null && typeof categoria_id !== 'number') {
        erros.push('categoria_id deve ser um número')
    }

    if (erros.length) {
        return res.status(400).json({ erros })
    }

    next();
}

export function validarAtualizacaoProduto(req, res, next) {
    const { nome, preco, quantidade_estoque, categoria_id } = req.body;
    const erros = [];

    const camposEnviados = Object.keys(req.body).filter((campo) => CAMPOS_PRODUTO.includes(campo))

    if (camposEnviados.length === 0) {
        erros.push('envie pelo menos um campo para atualizar')
    }

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
        erros.push('nome é obrigatório e deve ser um texto');
    }

    if (preco === undefined || preco === null || typeof preco !== 'number' || preco <= 0) {
        erros.push('preco é obrigatório e deve ser um número maior que zero');
    }

    if (quantidade_estoque !== undefined && (typeof quantidade_estoque !== 'number' || quantidade_estoque < 0)) {
        erros.push('quantidade_estoque deve ser um número maior ou igual a zero')
    }

    if (categoria_id !== undefined && categoria_id !== null && typeof categoria_id !== 'number') {
        erros.push('categoria_id deve ser um número')
    }

    if (erros.length) {
        return res.status(400).json({ erros })
    }

    next();
}