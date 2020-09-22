import {Request, Response} from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { Authenticator } from "../services/Athenticator";
import moment from "moment";
import { idText } from "typescript";


export const getMusics = async (req: Request, res: Response) => {


    try {

        const token = req.headers.authorization as string;
        const authenticator = new Authenticator();
        authenticator.verify(token);
    

        const musicDatabase = new MusicDatabase();
        const music =  await musicDatabase.getMusics();


        res.status(200).send(music);
        
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
    await BaseDatabase.destroyConnection();
}