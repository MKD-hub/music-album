import Songs from '../models/song.model';
import { Request, Response } from 'express';
import { Collection, Model, PipelineStage } from 'mongoose';

const getSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string || '1', 10);
        const limit = 10;

        if (isNaN(page) || page < 1) {
            res.status(400).json({ message: 'Invalid page number' });
        }

        const skip = (page - 1) * limit;
        
        const [songs, totalCount] = await Promise.all([
            Songs.find({})
                .skip(skip)
                .limit(limit),
            Songs.countDocuments()
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            songs,
            meta: {
                currentPage: page,
                perPage: limit,
                totalPages,
                totalCount
            }
        });
    } catch (error: unknown) {
        console.error('Error fetching songs:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

const getGenres = async (req: Request, res: Response): Promise<void> => {
    try{
    const genreNames = await Songs.distinct('genre');

    // Get the count of songs in each genre
    const genreCounts = await Songs.aggregate([
        {
            $group: {
                _id: "$genre",
                count: { $sum: 1 }
            }
        }
    ]);

    // Combine genres and counts
    const genres = genreNames.map(genre => ({
        genre,
        count: genreCounts.find((gc: { _id: string; }) => gc._id === genre)?.count || 0
    }));

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


const getSongsByGenre = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = 10;
    try {
        const genre: string = req.params.genre ?? {};

        if (isNaN(page) || page < 1) {
            res.status(400).json({ message: 'Invalid page number' });
        }

        const skip = (page - 1) * limit;
        
        const [songs, totalCount] = await Promise.all([
            Songs.find({ genre: genre })
                .skip(skip)
                .limit(limit),
            Songs.countDocuments()
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            songs,
            meta: {
                currentPage: page,
                perPage: limit,
                totalPages,
                totalCount
            }
        });
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

const createSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const song = await Songs.create(req.body);
        res.status(200).send(song);
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
    getSongsByGenre,
    getAlbumByArtist,
    createSong,
    updateSong,
    deleteSong
}
