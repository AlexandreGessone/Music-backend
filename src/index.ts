import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { signUp } from "./endpoints/signUp";
import { login } from "./endpoints/login";
import { createMusic } from "./endpoints/createMusic";
import { getMusics } from "./endpoints/getMusics";
import cors from "cors";



dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(cors());

app.post("/signup", signUp);
app.post("/login", login);
app.post("/music/:user_id", createMusic);
app.get("/feed", getMusics);




const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
