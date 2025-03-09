import sql from '../config/db.js';

export const createItem = async (req, res) => {
    try {
        const { RC, Material, Quantidade, Valor, Valor_NF, Un, Marca, Recebimento } = req.body;
        const [item] = await sql`
            INSERT INTO "FK Stock" ("RC", "Material", "Quantidade", "Valor", "Valor_NF", "Un", "Marca", "Recebimento", "Created_at")
            VALUES (${RC}, ${Material}, ${Quantidade}, ${Valor}, ${Valor_NF}, ${Un}, ${Marca}, to_char(${Recebimento}::date, 'DD-MM-YYYY'), NOW() AT TIME ZONE 'America/Sao_Paulo')
            RETURNING *`;
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItems = async (req, res) => {
    try {
        console.log('Request received:', req.method, req.url); // Log request method and URL
        const items = await sql`SELECT *, to_char("Recebimento"::date, 'DD-MM-YYYY') as "Recebimento" FROM "FK Stock"`;
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const [item] = await sql`SELECT *, to_char("Recebimento"::date, 'DD-MM-YYYY') as "Recebimento" FROM "FK Stock" WHERE "Id" = ${req.params.id}`;
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
            SET "RC" = ${RC}, "Material" = ${Material}, "Quantidade" = ${Quantidade}, "Valor" = ${Valor}, "Valor_NF" = ${Valor_NF}, "Un" = ${Un}, "Marca" = ${Marca}, "Recebimento" = to_char(${Recebimento}::date, 'DD-MM-YYYY'), "Updated_at" = NOW() AT TIME ZONE 'America/Sao_Paulo'
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