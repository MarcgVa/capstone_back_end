const { prisma } = require("../src/common/common");




async function seed() {
  console.log("Seeding the database.");
  try {
    await prisma.servicePlan.create({
      data: {
        title: "Lawn cut every weekly",
        description: "A team member will come by and cut, weed-eat, and blow your yard.",
        cost: 160.00,
        cycle: 7,
      },
    });

    await prisma.servicePlan.create({
      data: {
        title: "Lawn cut every 10 days",
        description:
          "A team member will come by and cut, weed-eat, and blow your yard every 10 days.",
        cost: 120.0,
        cycle: 10,
      },
    });

    await prisma.servicePlan.create({
      data: {
        title: "Lawn cut every 2 weeks",
        description:
          "A team member will come by and cut, weed-eat, and blow your yard every 14 days.",
        cost: 80.0,
        cycle: 14,
      },
    });


    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}



