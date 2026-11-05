import pool from '../config/db.js';

const CAMPOS_PRODUTO = ['nome', 'descricao', 'preco', 'quantidade_estoque', 'categoria_id'];

//Função para criar um novo produto
export async function criar(produto) {
    const { nome, descricao, preco, quantidade_estoque, categorias_id } = produto;
    const [r] = await pool.query(
        'INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, categorias_id) ' +
        'VALUES(?,?,?,?,?)', [nome, descricao ?? null, preco, quantidade_estoque ?? 0, categorias_id ?? null]);
    return r.insertId
}

//Função para listar todos os produtos
export async function listar() {
    const [rows] = await pool.query(
    `SELECT produtos.id, produtos.nome, produtos.descricao,
    produtos.preco, produtos.quantidade_estoque, categorias.nome AS categoria
    FROM produtos
    INNER JOIN categorias 
    ON produtos.categorias_id = categorias.id`
    );
    return rows;
}

//Função para buscar produto pelo ID
export async function buscarPorId(id) {
    const [rows] = await pool.query(
        `SELECT produtos.id, produtos.nome, produtos.descricao,
        produtos.preco, produtos.quantidade_estoque, categorias.nome AS categoria
        FROM produtos
        INNER JOIN categorias 
        ON produtos.categorias_id = categorias.id 
        WHERE produtos.id = ?`, [id]);
    return rows[0];
}

//Função para atualizar os dados de um produto
export async function atualizar(id, camposAtualizados) {
    const camposParaAtualizar = Object.keys(camposAtualizados).filter((campo) => CAMPOS_PRODUTO.includes(campo));

    const setClause = camposParaAtualizar.map((campo) => `${campo} = ?`).join(', ');

    const valores = camposParaAtualizar.map((campo) => camposAtualizados[campo]);

    const [r] = await pool.query(
        `UPDATE produtos set ${setClause} WHERE id = ?`,
        [...valores, id] // O ... espalha o conteúdo do array 
    )

    return r.affectedRows;  
}

//Função para excluir um produto
export async function deletar(id) {
    const [r] = await pool.query('DELETE FROM produtos WHERE id=?', [id]);
    return r.affectedRows;
}