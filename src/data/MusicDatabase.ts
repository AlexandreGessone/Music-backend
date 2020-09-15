import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {

    private static TABLE_NAME: string = "Musics";

    public async createMusic(
        id: string, 
        title: string, 
        author: string, 
        date: Date, 
        file: string,
        genre: string,
        album: string
        ): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            title,
            author,
            date,
            file,
            genre,
            album
        }).into(MusicDatabase.TABLE_NAME);
    }

    
}