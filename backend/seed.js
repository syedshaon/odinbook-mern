require("dotenv").config();

const { faker } = require("@faker-js/faker");
const User = require("./models/userModel"); // Adjust the path to your User model

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.mongoCon;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connecion error: "));

function createRandomUser() {
  return {
    username: faker.internet.userName(),
    password: "$2a$10$M2EdfJdvbXMMDRxyZ1ouXun2ld1EkaUkanBMDfGZL2zg0LTL.caXy",
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bio: faker.lorem.sentence(),
    profilePicture: faker.image.avatar(),
    coverPicture: faker.image.url({ height: 400, width: 1600 }),
    isActive: true, // or use faker.random.boolean() for a random boolean
  };
}

// Seed the database with 20 fake users
const seedDatabase = async () => {
  try {
    // Generate and save 20 fake users
    const fakeUsers = Array.from({ length: 50 }, () => createRandomUser());
    await User.insertMany(fakeUsers);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

seedDatabase();
