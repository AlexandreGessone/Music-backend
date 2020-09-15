import {Request, Response} from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Athenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const signUp = async (req: Request, res: Response) => {

    try {
        const name = req.body.name
        const email = req.body.email
        const nickname = req.body.nickname
        const password = req.body.password

        if(!name || !email || !nickname || !password) {
            throw new Error ("Insert all informations required!")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(
            id, 
            name,
            email,
            nickname,
            hashPassword
        );

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({id});

        res.status(200).send({
            message: "User created successfully!",
            token
        })
        
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

    await BaseDatabase.destroyConnection();
};