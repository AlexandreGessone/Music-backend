import {Request, Response} from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { Authenticator } from "../services/Athenticator";
import { IdGenerator } from "../services/IdGenerator";


export const createMusic = async (req: Request, res: Response) => {
    try {

        const token = req.headers.authorization as string;
        const user_id = req.params.user_id as any;
        const title = req.body.title;
        const author = req.body.author;
        const file = req.body.file;
        const genre = req.body.genre;
        const album = req.body.album;

       


        if(!token || !title || !user_id || !author || !file || !genre || !album) {
            throw new Error ("Insert all informations required!")
        }

        const authenticator = new Authenticator();
        authenticator.verify(token);

        const idGenerator = new IdGenerator();
        const id_music = idGenerator.generateId();

        const createDate = Date.now();


        const musicDatabase = new MusicDatabase();
        await musicDatabase.createMusic(
            id_music,
            user_id,
            title,
            author,
            createDate,
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