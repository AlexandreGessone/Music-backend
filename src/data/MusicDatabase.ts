import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {

    private static TABLE_NAME: string = "Musics";

    public async createMusic(
        id: string, 
        user_id: string,
        title: string, 
        author: string, 
        date: number, 
        file: string,
        genre: string,
        album: string
        ): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            user_id,
            title,
            author,
            date,
            file,
            genre,
            album
        }).into(MusicDatabase.TABLE_NAME);
    };

    public async getMusics(): Promise<void> {
        await this.getConnection()
        .select("*").from(MusicDatabase.TABLE_NAME)
    };
}