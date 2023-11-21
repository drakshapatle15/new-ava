import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route";
import chatRoutes from "./routes/chat.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/chat", chatRoutes);

const mongoOptions: ConnectOptions | any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect("mongodb://localhost:27017/node-ts-mongodb", mongoOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })

  .catch((error) => console.error(error));
