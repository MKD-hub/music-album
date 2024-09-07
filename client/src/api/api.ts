import axios, { AxiosError } from 'axios';
import { ISong, Response } from './song.type';
import { PayloadAction } from '@reduxjs/toolkit';

const targetUrl = import.meta.env.VITE_API_URL;

const fetchSongs = async ( page: number ): Promise<Response> => {
    try {
        const response = await axios.get(`${targetUrl}/songs?page=${page}`);
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

const postSong = async ( songData: ISong  ) => {
    try {
        const response = await axios.post(`${targetUrl}/create`, {
            ...songData,
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
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

const updateSong = async ( action: PayloadAction<Partial<ISong>> ) => {
    console.log(action.payload, 'actions')
    try {
        const response = await axios.put(`${targetUrl}/update/${action.payload._id}`, action.payload);
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
    fetchAlbumByArtist,
    postSong,
    updateSong,
    deleteSong
}

