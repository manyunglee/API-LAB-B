import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import { sequelize } from './db.js';
import { User } from './models/user.js';
import { Collectable } from './models/collectable.js'; 

async function run() {
  try {
    
    await sequelize.sync({ force: true });

    // Users
    const adminPass = await bcrypt.hash('admin123', 10);
    const userPass = await bcrypt.hash('user123', 10);
    await User.create({ username: 'admin', passwordHash: adminPass, role: 'admin' });
    await User.create({ username: 'customer', passwordHash: userPass, role: 'user' });

    // Sample collectables 
    await Collectable.bulkCreate([
      { name: 'Pikachu', company: 'Nintendo', description: 'Limited Edition', price: 155, stock: 6, category: 'Figure' },
      { name: 'Batman',  company: 'DC Comics', description: 'With Batmobile', price: 30, stock: 9, category: 'Figure' },
      { name: 'Joker',   company: 'Atlus',    description: 'Persona set',    price: 66.6, stock: 10, category: 'Figure' }
    ]);

    
    process.exit(0);
  } catch (e) {
    console.error('Seed error:', e.message);
    process.exit(1);
  }
}

run();

