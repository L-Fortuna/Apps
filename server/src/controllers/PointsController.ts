import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController{
    async index(request: Request, response: Response){
        const {cidade, uf, types} = request.query;

            const parsedTypes = String(types)
            .split(',').map(type => Number(type.trim()))

            const points = await knex('points')

            .join('points_types', 'points.id', '=', 'points_types.points_id')
            .whereIn('points_types.types_id', parsedTypes)
            .where('cidade', String(cidade))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            return response.json(points);

    }

    async show(request: Request, response: Response){

        const {id} = request.params;
        const point = await knex('points').where('id', id).first();

        if(!point){
        return response.status(400).json({ message: 'Point not found.' });
    }
        const types = await knex('types')
            .join('points_types', 'types.id', '=', 'points_types.types_id')
            .where('points_types.points_id', id)
            .select('types.title');



        return response.json({point, types});
    }

    async create (request: Request, response: Response){
        const {
      
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          cidade,
          uf,
          types
        }= request.body;
      
        const trx = await knex.transaction();
        const point = {
            image:'https://images.unsplash.com/photo-1511914678378-2906b1f69dcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            cidade,
            uf
        
          };
        const insertedIds = await trx('points').insert(point);
          const points_id = insertedIds[0];
      
          const pointTypes = types.map((types_id: number) => {
            return{
              types_id,
              points_id,
            };
          });
        await trx('points_types').insert(pointTypes);

        await trx.commit();

          return response.json({
             id:points_id,
              ...point,
          });
      }

    }

export default PointsController;