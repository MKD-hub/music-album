interface Response {
    songs: ISong[],
    meta: Record<string, number>
}

interface ISong {
    _id?: '',
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
    genre: string,
    count: number
}

export type {
    Response,
    ISong,
    IAlbum,
    IArtist,
    IGenre
};