import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("students", (table) => {
        table.timestamp("deleted_at").alter()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('students', (table) => {
        table.timestamp('deleted_at').defaultTo(knex.fn.now()).alter();
    })
}

