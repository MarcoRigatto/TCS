const pool = require("../config/database");

const CAMPOS_SELECT = `
    s.id,
    s.title AS titulo,
    a.name AS artista,
    s.album,
    s.tuning AS afinacao,
    s.instrument AS instrumento,
    s.status,
    s.genre AS genero,
    s.difficulty AS dificuldade,
    s.link,
    s.observations AS observacoes,
    s.tags,
    s.sources AS fontes,
    s.artwork_url AS "artworkUrl",
    s.created_at AS "criadoEm",
    s.updated_at AS "atualizadoEm"
`;

async function listar() {
    const resultado = await pool.query(`
        SELECT ${CAMPOS_SELECT}
        FROM songs s
        INNER JOIN artists a ON a.id = s.artist_id
        ORDER BY s.id DESC
    `);
    return resultado.rows;
}

async function buscarPorId(id) {
    const resultado = await pool.query(`
        SELECT ${CAMPOS_SELECT}
        FROM songs s
        INNER JOIN artists a ON a.id = s.artist_id
        WHERE s.id = $1
    `, [id]);
    return resultado.rows[0] || null;
}

async function obterOuCriarArtista(nome, client = pool) {
    const resultado = await client.query(`
        INSERT INTO artists (name)
        VALUES ($1)
        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
        RETURNING id
    `, [nome]);
    return resultado.rows[0].id;
}

async function criar(dados) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const artistId = await obterOuCriarArtista(dados.artista, client);
        const resultado = await client.query(`
            INSERT INTO songs (
                title, artist_id, album, tuning, instrument, status,
                genre, difficulty, link, observations, tags, sources, artwork_url
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12::jsonb, $13)
            RETURNING id
        `, [
            dados.titulo, artistId, dados.album || null, dados.afinacao || null,
            dados.instrumento || null, dados.status || "Não iniciada", dados.genero || null,
            dados.dificuldade || null, dados.link || null, dados.observacoes || null,
            JSON.stringify(dados.tags || []), JSON.stringify(dados.fontes || []), dados.artworkUrl || null
        ]);
        await client.query("COMMIT");
        return buscarPorId(resultado.rows[0].id);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

async function atualizar(id, dados) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const atual = await client.query("SELECT artist_id FROM songs WHERE id = $1", [id]);
        if (!atual.rowCount) {
            await client.query("ROLLBACK");
            return null;
        }
        const artistId = dados.artista
            ? await obterOuCriarArtista(dados.artista, client)
            : atual.rows[0].artist_id;
        const resultado = await client.query(`
            UPDATE songs SET
                title = COALESCE($1, title), artist_id = $2,
                album = COALESCE($3, album), tuning = COALESCE($4, tuning),
                instrument = COALESCE($5, instrument), status = COALESCE($6, status),
                genre = COALESCE($7, genre), difficulty = COALESCE($8, difficulty),
                link = COALESCE($9, link), observations = COALESCE($10, observations),
                tags = COALESCE($11::jsonb, tags), sources = COALESCE($12::jsonb, sources),
                artwork_url = COALESCE($13, artwork_url), updated_at = NOW()
            WHERE id = $14 RETURNING id
        `, [
            dados.titulo ?? null, artistId, dados.album ?? null, dados.afinacao ?? null,
            dados.instrumento ?? null, dados.status ?? null, dados.genero ?? null,
            dados.dificuldade ?? null, dados.link ?? null, dados.observacoes ?? null,
            dados.tags === undefined ? null : JSON.stringify(dados.tags),
            dados.fontes === undefined ? null : JSON.stringify(dados.fontes),
            dados.artworkUrl ?? null, id
        ]);
        await client.query("COMMIT");
        return resultado.rowCount ? buscarPorId(id) : null;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

async function excluir(id) {
    const resultado = await pool.query("DELETE FROM songs WHERE id = $1 RETURNING id", [id]);
    return resultado.rowCount > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
