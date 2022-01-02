import knex from "../database/connection";
import { Response, Request } from "express";

class TypesController{
async index(request: Request, response: Response) {
    const types = await knex('types').select('*');
    const serializedTypes = types.map(type =>{
      return {
        id: type.id,
        title: type.title,
        image_url: `http://192.168.0.5:3333/uploads/${type.image}`,
      };
    });

return response.json(serializedTypes);
}
}

export default TypesController;