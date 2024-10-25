import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const data = Array.from({ length: 100 }).map((_, index) => ({
    title: `Title ${index + 1}`,
    description: `Description for item ${index + 1}`,
  }));

  await prisma.table.createMany({
    data,
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
