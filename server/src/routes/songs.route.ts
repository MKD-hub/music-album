import express from 'express';
import Songs from '../models/song.model';
import {
    getSongs,
    getGenres,
    getArtists,
    getSongsByGenre,
    getSongsByArtist,
    getAlbumByArtist,
    createSong,
    updateSong,
    deleteSong
} from '../controllers/song.controller';

const router = express.Router();


router.get('/songs', getSongs);
router.get('/get_genres', getGenres);
router.get('/get_artists', getArtists);
router.get('/song/:artist', getSongsByArtist);
router.get('/album/:artist', getAlbumByArtist);
router.get('/genre/:genre', getSongsByGenre);
router.post('/create', createSong);
router.put('/update/:id', updateSong);
router.delete('/delete/:id', deleteSong);

export default router;