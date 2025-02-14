import mongoose from "mongoose";

const url = process.env.DB_URL;

const connectDb = async () => {
  await mongoose.connect(url, {
    dbName: "exam",
  });
};
export default connectDb;
