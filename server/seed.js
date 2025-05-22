const { prisma, bcrypt } = require("../src/common/common");
console.log('seed file')
const data = [
  {
    title: "Lawn cut every 7 days",
    description: "Our team services your lawn on a 7-day cycle.",
    cost: 80,
    cycle: 7,
    code: "Lawn Service",
  },
  {
    title: "Lawn cut once",
    description: "Our team services your lawn per request.",
    cost: 60,
    cycle: 2,
    code: "Lawn Service",
  },
  {
    title: "Lawn cut every 10 days",
    description: "Our team services your lawn on a 10-day cycle.",
    cost: 120,
    cycle: 10,
    code: "Lawn Service",
  },
  {
    title: "Lawn cut every 2 weeks",
    description: "Our team services your lawn on a 14-day cycle.",
    cost: 80,
    cycle: 14,
    code: "Lawn Service",
  },
  {
    title: "Bed Maintenance",
    description:
      "Our team comes out every couple of months to weeded and clear debris from your beds.  Please contact us ahead of our scheduled visit when additional work is required.",
    cost: 50,
    cycle: 1,
    code: "Bed Maintenance",
  },
  {
    title: "Tree Pruning",
    description:
      "A Tech visits the site to discuss which trees need pruning.  Then our operations team will work with you to schedule pruning.",
    cost: 50,
    cycle: 1,
    code: "Tree Pruning",
  },
  {
    title: "Leaf Removal",
    description: "Our team comes out and remove the leaves from your yard.",
    cost: 45,
    cycle: 1,
    code: "Leaf Removal",
  },
  {
    title: "Snow Removal",
    description: "Our team will remove snow from your driveway and sidewalks.",
    cost: 60,
    cycle: 1,
    code: "Snow Removal",
  },
  {
    title: "Our Lawn Service",
    description:
      "Our lawn service includes mowing, weed-eating, trimming, and cleaning up before we leave your property.",
    cost: 0,
    cycle: 0,
    code: "Lawn Service",
  },
];

const users = [
  {
    firstName: "Marc",
    lastName: "Grupe",
    email: "mgr@glc.com",
    password: "fs@-p@ssWord",
    address: "68 Walnut Farms Parkway",
    city: "Fredericksburg",
    state: "Virginia",
    zip: "22405",
    phone: "540-555-1234",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "user@glc.com",
    password: "fs@-p@ssWord",
    address: "213 Brooke Rd",
    city: "Fredericksburg",
    state: "Virginia",
    zip: "22405",
    phone: "555-123-4567",
  },
  {
    firstName: "Pam",
    lastName: "Jones",
    email: "user2@glc.com",
    password: "fs@-p@ssWord",
    address: "145 Hyannis Place",
    city: "Fredericksburg",
    state: "Virginia",
    zip: "22406",
    phone: "555-234-5678",
  },
  {
    firstName: "Bryan",
    lastName: "Grupe",
    email: "tech@glc.com",
    password: "fs@-p@ssWord",
    address: "68 Walnut Farms Parkway",
    city: "Fredericksburg",
    state: "Virginia",
    zip: "22405",
    phone: "540-234-5678",
  },
];


async function seed() {
  console.log("Seeding the database.");
  try {
    // await prisma.servicePlan.createMany({
    //   data
    // });

    for (let i = 0; i < users.length; i++){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(users[i].password, salt);
      await prisma.user.create({
        data: {
          email: users[i].email,
          password: hashedPassword,
          account: {
            create: {
              firstName: users[i].firstName,
              lastName: users[i].lastName,
              address: users[i].address,
              city: users[i].city,
              state: users[i].state,
              zip: users[i].zip*1,
              phone: users[i].phone,
            },
          },
        },
      });    
    }
    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}

// Seed the database if we are running this file directly.
// if (require.main === module) {
//   seed();
// }
seed();


