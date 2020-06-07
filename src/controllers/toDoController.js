const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (req,res){
        const { page = 1 } = req.query;

        const [ count ] = await connection('todo').count();

        const itens = await connection('todo')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'todo.id',
            'todo.title',
            'todo.description'
        ]);

        res.header('Total-Count', count['count(*)']);
        return res.json(itens);
    },

    async create (req,res){
        const { title, description } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('todo').insert({
            id,
            title,
            description,
        });

        return res.json({ id });
    },

    async delete (req,res){
        const { id } = req.params;

        const todo = await connection('todo')
            .where('id', id)
            .first();

        await connection('todo').where('id', id).delete();

        return res.status(204).send();
    },

    async update (req,res){
        const { id } = req.params;

        const { title, description } = req.body;

        await connection('todo').where('id', id)
        .update({
            title,
            description,
        })

        return res.json({ id });
    }
}