interface ISong {
    title: string,
    artist: string,
    album: string,
    genre: string
}

interface IAlbum {
    name: string,
    songsInAlbum: number
}

interface IArtist {
    name: string,
    numberOfSongsPublished: number,
    numberOfAlbumsPublished: number
}

interface IGenre {
    name: string,
    numberOfSongsInGenre: number
}

export type {
    ISong,
    IAlbum,
    IArtist,
    IGenre
};