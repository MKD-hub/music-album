import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        artist: {
            type: String,
            required: true
        },

        album: {
            type: String,
            required: true
        }, 

        genre: {
            type: String,
            required: true
        }
    }
);

const Songs = mongoose.model("Song", SongSchema);

export default Songs;