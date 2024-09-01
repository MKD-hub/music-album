import Songs from '../models/song.model';
import { Request, Response } from 'express';
import { PipelineStage } from 'mongoose';

const getSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const songs = await Songs.find({});
        res.status(200).json(songs);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

const getGenres = async (req: Request, res: Response): Promise<void> => {
    try {
        const genres = await Songs.distinct('genre');
        res.status(200).json(genres)
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

const getArtists = async (req: Request, res: Response): Promise<void> => {
    try {
        const artists = await Songs.distinct('artist');
        res.status(200).json(artists)
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

const getSongsByGenre = async (req: Request, res: Response): Promise<void> => {
    try {
        const genre: string = req.params.genre ?? {};
        const songs = await Songs.find({
            genre: genre
        }).select('title artist album genre')
        res.status(200).json(songs);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

const getSongsByArtist = async (req: Request, res: Response): Promise<void> => {
    try {
        const artist: string = req.params.artist ?? {};
        const songs = await Songs.find({
            artist: artist
        }).select('title artist album genre')
        res.status(200).json(songs);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

const getAlbumByArtist = async (req: Request, res: Response): Promise<void> => {
    const limit = typeof req.query.limit === 'string' && !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
    const skip = Math.max(typeof req.query.page === 'number' ? req.query.page : parseInt(req.query.page as string), 0) - 1;
    
    try {
        const artist: string = req.params.artist ?? '';

        const pipeline: PipelineStage[] = [
            {
                $match: { artist: artist }
            },
            {
                $group: {
                    _id: "$album",
                    songs_in_album: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: limit
            },
            {
                $skip: skip * limit
            }
        ];

        const albums = await Songs.aggregate(pipeline);
        
        res.status(200).json(albums);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// const getAlbumByArtist = async (req: Request, res: Response): Promise<void> => {
//     const limit = typeof req.query.limit === 'string' && !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
//     const skip = Math.max(typeof req.query.page === 'number' ? req.query.page : 0, 0) - 1;
    
//     try {
//         const artist: string = req.params.artist ?? {};

//         const albums = await Songs.distinct('album', { artist: artist })
//         res.status(200).json(albums);   
//     }
//     catch (error: unknown) {
//         if (error instanceof Error) {
//             res.status(500).json({ message: error.message });
//         } else {
//             res.status(500).json({ message: 'An unexpected error occurred' });
//         }
//     }
// }

const createSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const song = await Songs.create(req.body);
        res.status(200).json(song);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Failed to create song!' });
        }
    }
}

const updateSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const song = await Songs.findByIdAndUpdate(id, req.body);

        if (!song) {
            res.status(404).json({ message: 'Song not found' })
        }

        const updatedSong = await Songs.findById(id);
        res.status(200).json(updatedSong);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }    
    }
}

const deleteSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const song = await Songs.findByIdAndDelete(id);

        if (!song) {
            res.status(404).json({ message: "Song not found" })
        }

        res.status(200).json({ message: "Song deleted successfully." })
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }    
    }
};

export {
    getSongs,
    getGenres,
    getArtists,
    getSongsByGenre,
    getSongsByArtist,
    getAlbumByArtist,
    createSong,
    updateSong,
    deleteSong
}
