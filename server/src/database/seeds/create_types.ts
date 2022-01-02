import { Knex } from "knex";


export async function seed(knex:Knex) {
    await knex('types').insert([ 
        {title: 'Restaurante', image:'restaurante.svg'}, 
        {title: 'Lanchonete', image:'lanchonete.svg'},
        {title: 'Bar', image:'bar.svg'},
        {title: 'Sorveteria', image:'sorveteria.svg'},
        {title: 'Cafeteria', image:'cafeteria.svg'},
        {title: 'Eventos', image:'eventos.svg'},
    ])
}