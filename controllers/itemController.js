import sql from '../config/db.js';

export const createItem = async (req, res) => {
    try {
        const { Material, RC, Un, Valor, Marca } = req.body;
        const [item] = await sql`
            INSERT INTO "FK Stock" ("Material", "RC", "Un", "Valor", "Marca", "Created_at")
            VALUES (${Material}, ${RC}, ${Un}, ${Valor}, ${Marca}, NOW() AT TIME ZONE 'America/Sao_Paulo')
            RETURNING *`;
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItems = async (req, res) => {
    try {
        const items = await sql`SELECT * FROM "FK Stock"`;
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const [item] = await sql`SELECT * FROM "FK Stock" WHERE "Id" = ${req.params.id}`;
        if (!item) {
            throw new Error('Item not found');
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { Material, RC, Un, Valor, Marca } = req.body;
        const [item] = await sql`
            UPDATE "FK Stock"
            SET "Material" = ${Material}, "RC" = ${RC}, "Un" = ${Un}, "Valor" = ${Valor}, "Marca" = ${Marca}, "Updated_at" = NOW() AT TIME ZONE 'America/Sao_Paulo'
            WHERE "Id" = ${req.params.id}
            RETURNING *`;
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        await sql`DELETE FROM "FK Stock" WHERE "Id" = ${req.params.id}`;
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};