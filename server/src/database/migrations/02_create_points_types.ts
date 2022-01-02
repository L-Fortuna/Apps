import {Knex} from 'knex';
export async function up(knex:Knex){
   return knex.schema.createTable('points_types', table =>{
        table.increments('id').primary();
    table.integer('points_id')
    .notNullable()
    .references('id')
    .inTable('points')
    
    table.integer('types_id')
    .notNullable()
    .references('id')
    .inTable('type')
    });

}

export async function down(knex: Knex) {
   return knex.schema.dropTable('points_types');

}