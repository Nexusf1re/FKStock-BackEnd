import sql from '../config/db.js';

export const createItem = async (req, res) => {
    console.log('Request body:', req.body);
    try {
        const { RC, Material, Quantidade, Valor, Valor_NF, Un, Marca, Recebimento } = req.body;
        const [item] = await sql`
            INSERT INTO "FK Stock" ("RC", "Material", "Quantidade", "Valor", "Valor_NF", "Un", "Marca", "Recebimento", "Created_at")
            VALUES (${RC}, ${Material}, ${Quantidade}, ${Valor}, ${Valor_NF}, ${Un}, ${Marca}, ${Recebimento}::date, NOW() AT TIME ZONE 'America/Sao_Paulo')
            RETURNING *, to_char("Created_at", 'YYYY-MM-DD HH24:MI:SS') as "Created_at"`; // Formato atualizado
        res.status(201).json(item);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(400).json({ error: error.message });
    }
};

export const getItems = async (req, res) => {
    try {
        const items = await sql`SELECT *, to_char("Recebimento"::date, 'DD-MM-YYYY') as "Recebimento", to_char("Created_at", 'DD-MM-YYYY HH24:MI:SS') as "Created_at", to_char("Updated_at", 'DD-MM-YYYY HH24:MI:SS') as "Updated_at" FROM "FK Stock"`; // Formato atualizado
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const [item] = await sql`SELECT *, to_char("Recebimento"::date, 'YYYY-MM-DD') as "Recebimento", to_char("Created_at", 'YYYY-MM-DD HH24:MI:SS') as "Created_at" FROM "FK Stock" WHERE "Id" = ${req.params.id}`; // Formato atualizado
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
        const { RC, Material, Quantidade, Valor, Valor_NF, Un, Marca, Recebimento } = req.body;
        const [item] = await sql`
            UPDATE "FK Stock"
            SET "RC" = ${RC}, "Material" = ${Material}, "Quantidade" = ${Quantidade}, "Valor" = ${Valor}, "Valor_NF" = ${Valor_NF}, "Un" = ${Un}, "Marca" = ${Marca}, "Recebimento" = (${Recebimento}::date), "Updated_at" = NOW() AT TIME ZONE 'America/Sao_Paulo'
            WHERE "Id" = ${req.params.id}
            RETURNING *, to_char("Updated_at", 'YYYY-MM-DD HH24:MI:SS') as "Updated_at"`; // Formato atualizado
        if (!item) {
            throw new Error('Update failed');
        }
        res.status(200).json(item);
    } catch (error) {
        console.error('Error updating item:', error);
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