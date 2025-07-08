import mongoose from "mongoose";
import { dbname } from "../constant.js";

const dbconnection = async () => {
  try {
    const response = await mongoose.connect(`${process.env.dblink}${dbname}`);
    console.log(`Database connected ${response.connection.host}`);
  } catch (err) {
    console.log(`Error in db connection ${err}`);
    process.exit(1);
  }
};

export { dbconnection };
