import { Knex } from "knex";
import bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    const hash = await bcrypt.hash('superadmin', 10)
    
    await knex("users").insert([
        { 
          email: "superadmin@email.com", 
          name:'Super Admin', 
          password: hash, 
          role:'superadmin', 
          created_at: new Date()
        }
    ]);
};
