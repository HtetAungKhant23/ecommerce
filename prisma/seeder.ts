import { PrismaClient } from '@prisma/client';
import * as agron2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  await prisma.admin
    .create({
      data: {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: await agron2.hash('admin12345'),
      },
    })
    .then(() => console.log('Admin seeding success.'));
}

main();
