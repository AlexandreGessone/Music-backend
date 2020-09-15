import { compare } from "bcryptjs";
import {Request, Response} from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Athenticator";
import { HashManager } from "../services/HashManager";

export const login = async (req: Request, res: Response) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserByEmail(email);

        const hashManager = new HashManager();
        const isPasswordCorrect = await hashManager.compare(password, user.password);

        if(!isPasswordCorrect){
            throw new Error ("User or password incorrect");
        }

        const authenticador = new Authenticator();
        const token = authenticador.generateToken({id: user.id})

        res.status(200).send({
            message: "User logged successfully!",
            token
        });

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

    await BaseDatabase.destroyConnection();
}