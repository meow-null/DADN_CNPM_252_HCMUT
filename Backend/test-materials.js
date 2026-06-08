import { prisma } from "./src/common/prisma/connect.prisma.js";
async function run() {
  try {
    const grades = await prisma.material_grades.findMany();
    console.log("MATERIALS COUNT:", grades.length);
    console.log("MATERIALS:", JSON.stringify(grades, null, 2));
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
