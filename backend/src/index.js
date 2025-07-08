import { app } from "./app.js";
import dotenv from "dotenv";
import { dbconnection } from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.port || 8002;

dbconnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error in db connection ${err}`);
  });
