import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("students", (table) => {
        table.bigInteger("document").notNullable().alter()
    })

    // Enable UUID extension
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    
    // Add to existing table (e.g., students)
    await knex.schema.alterTable('students', (table) => {
        table.string('externalId', 36)
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .notNullable()
            .alter()
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('students', (table) => {
        table.integer('document').notNullable().alter();
    })

    await knex.schema.alterTable('students', (table) => {
        table.dropColumn('externalId');
    });
    await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}

