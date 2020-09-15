import {Request, Response} from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { Authenticator } from "../services/Athenticator";
import { IdGenerator } from "../services/IdGenerator";


export const createMusic = async (req: Request, res: Response) => {
    try {

        const token = req.headers.authorization as string;
        const id = req.params.id as any;
        const title = req.body.title;
        const author = req.body.author;
        const date = req.body.data;
        const file = req.body.file;
        const genre = req.body.genre;
        const album = req.body.album;


        if(!token || !id || !title || !author || !file || !genre || !album) {
            throw new Error ("Insert all informations required!")
        }

        const authenticator = new Authenticator();
        authenticator.verify(token);

        const idGenerator = new IdGenerator();
        const id_music = idGenerator.generateId();

        const musicDatabase = new MusicDatabase();
        await musicDatabase.createMusic(
            id_music,
            title,
            author,
            date,
            file,
            genre,
            album
        )

        res.status(200).send({
            message: "Music created successfully!",
        });
        
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

    await BaseDatabase.destroyConnection();
};