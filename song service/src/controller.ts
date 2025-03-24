import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";
import {redisClient} from './index.js'

export const getAllAlbum = TryCatch(async(req, res) => {
    let albums;
    const CACHE_EXPIRY = 1800;

    if(redisClient.isReady){
        albums = await redisClient.get("albums")
    }

    if(albums){
        console.log("Cache hit");
        // console.log(albums);
        res.json(JSON.parse(albums))
        return ;
    }else{
        console.log("Cache miss");
        albums = await sql`SELECT * FROM albums`

        if (albums.length === 0) {
            res.status(404).json({
            message: "No albums found",
        });
          return ;
          }

          if(redisClient.isReady){
            await redisClient.set("albums", JSON.stringify(albums), {
                EX: CACHE_EXPIRY
            })
          }
        // Send the albums as a response
        res.json(albums); 
    }  
})


export const getAllSongs= TryCatch(async(req, res) => {
    let songs;

    const CACHE_EXPIRY = 1800;

    if(redisClient.isReady){
        songs = await redisClient.get("songs")
    }

    if(songs){
        console.log("Cache hit");
        // console.log(albums);
        res.json(JSON.parse(songs))
        return ;
    }else{
        console.log("Cache miss");
        songs = await sql`SELECT * FROM songs`

         // Handle case where no songs exist
    if (songs.length === 0) {
        res.status(404).json({
            message: "No songs found",
        });
        return ;
    }

     if(redisClient.isReady){
         await redisClient.set("songs", JSON.stringify(songs), {
                EX: CACHE_EXPIRY
            })
          }
        // Send the songs as a response
        res.json(songs); 
    }  
});


export const getAllSongsOfAlbum = TryCatch(async(req, res) => {
    const {id} = req.params
    const CACHE_EXPIRY = 1800;

    let album, songs;
 
    if(redisClient.isReady){
        const cacheData = await redisClient.get(`album_songs_${id}`)
        if(cacheData){
            console.log("cache hit");
            res.json(JSON.parse(cacheData))
            return ;
        }
    }


    album = await sql`SELECT * FROM albums WHERE id = ${id}`

    if(album.length === 0){
        res.status(404).json({
            message:"No Album with this id"
        });

        return ;
    }

    songs = await sql`SELECT * FROM songs WHERE album_id = ${id}`

    const response = {songs, album: album[0]};

    if(redisClient.isReady){
        await redisClient.set(`album_songs_${id}`, JSON.stringify(response),{
            EX:CACHE_EXPIRY,
        })
    }
    
    console.log("cache miss");
    res.json(response);
})


export const getSingleSong = TryCatch(async(req, res) => {
    const song = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`;
    
    if (song.length === 0) {
         res.status(404).json({
            message: "No song exists with this ID",
        });
        return ;
    }

    res.json(song[0]);
      
})