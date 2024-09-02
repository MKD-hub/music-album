import axios, { AxiosError } from 'axios';
import { ISong } from './song.type';

const targetUrl = import.meta.env.VITE_API_URL;

const fetchSongs = async (): Promise<ISong[] | []> => {
    try {
        const response = await axios.get(`${targetUrl}/`);
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
    }
}

const fetchGenres = async () => {
    try {
        const response = await axios.get(`${targetUrl}/get_genres`)
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
    }
}

const fetchArtists = async (): Promise<String[] | []> => {
    try {
        const response = await axios.get(`${targetUrl}/get_artists`)
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
    }
}

const fetchSongsByGenre = async ( genre: string ): Promise<ISong[] | []> => {
    try {
        const response = await axios.get(`${targetUrl}/genre/${genre}`)
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
    }
}

const fetchSongsByArtist = async ( artist: string ) => {
    try {
        const response = await axios.get(`${targetUrl}/song/${artist}`)
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
    }
}

const fetchAlbumByArtist = async ( artist: string, page: number ) => {
    try {
        const response = await axios.get(`${targetUrl}/album/${artist}?limit=10&page=${page}`)
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
    }
}

const createSong = async ( songData: ISong  ) => {
    try {
        const response = await axios.post(`${targetUrl}/create`, songData)
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
    }
}

const updateSong = async ( id: string, songData: Partial<ISong> ) => {
    try {
        const response = await axios.put(`${targetUrl}/update/${id}`, songData);
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
        
    }
}

const deleteSong = async ( id: string ) => {
    try {
        const response = await axios.delete(`${targetUrl}/delete/${id}`);
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response ? error.response.data : error.message;
        } else {
            throw Error('Something went wrong.')
        }
        
    }
}

export {
    fetchSongs,
    fetchGenres,
    fetchArtists,
    fetchSongsByGenre,
    fetchSongsByArtist,
    fetchAlbumByArtist,
    createSong,
    updateSong,
    deleteSong
}

