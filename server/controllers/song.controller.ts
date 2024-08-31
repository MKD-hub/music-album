import Songs from '../models/song.model';

const getSongs = async (req, res) => {
    try {
        const songs = await Songs.find({});
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getGenres = async (req, res) => {
    try {
        const genres = await Songs.distinct('genres');
        res.status(200).json(genres)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getArtists = async (req, res) => {
    try {
        const artists = await Songs.distinct('artist');
        res.status(200).json(artists)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSongsByGenre = async (req, res) => {
    try {
        const { genre }: { genre: string } = req.params;
        const songs = await Songs.find({
            genre: genre
        }).select('title artist album genre')
    }
    catch (error) {
        res.status(500).json({ message: error. message })
    }
}

const getSongsByArtist = async (req, res) => {
    try {
        const { artist }: { artist: string } = req.params;
        const songs = await Songs.find({
            artist: artist
        }).select('title artist album genre')
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAlbumByArtist = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const skip = (parseInt(req.query.page) || 1) - 1;

    try {
        const { artist }: { artist: string } = req.params;

        const albums = await Songs.distinct('album', { artist: artist }).skip(skip * limit).limit(limit)
        res.status(200).json(albums);   
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createSong = async (req, res) => {
    try {
        const song = await Songs.create(req.body);
        res.status(200).json(song);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateSong = async (req, res) => {
    try {
        const { id } = req.params;

        const song = await Songs.findByIdAndUpdate(id, req.body);

        if (!song) {
            return res.status(404).json({ message: 'Song not found' })
        }

        const updatedSong = await Songs.findById(id);
        res.status(200).json(updatedSong);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;

        const song = await Songs.findByIdAndDelete(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" })
        }

        res.status(200).json({ message: "Song deleted successfully." })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
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
