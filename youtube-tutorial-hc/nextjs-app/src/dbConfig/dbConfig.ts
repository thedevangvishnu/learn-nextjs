import mongoose from "mongoose";

export const connectToMongo = async () => {
  try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connection successfull!");
    });

    connection.on("error", (error) => {
      console.log("Error connecting to MongoDB", error);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to MongoDB!", error);
  }
};
