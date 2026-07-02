import "dotenv/config";
import { prisma } from "./lib/prisma";
import { hashPassword } from "../src/shared/utils/hashPassword";

const TEAM_NAME = "Coutinho Team";
const ADMIN_NAME = "Arthur Coutinho";
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "changeme";

async function main() {
  let team = await prisma.team.findFirst({ where: { name: TEAM_NAME } });
  if (!team) {
    team = await prisma.team.create({ data: { name: TEAM_NAME } });
    console.log(`Seed: time "${TEAM_NAME}" criado.`);
  }

  const existingAdmin = await prisma.users.findUnique({ where: { email: ADMIN_EMAIL } });
  if (existingAdmin) {
    console.log("Seed: admin já existe, nada a fazer.");
    return;
  }

  const hashedPassword = await hashPassword(ADMIN_PASSWORD);
  await prisma.users.create({
    data: {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
      team_id: team.id,
    },
  });
  console.log(`Seed: admin "${ADMIN_EMAIL}" criado.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
