import { RiDeleteBin7Fill, RiEditFill } from 'react-icons/ri';

interface SelectionProps {
    title: string,
    artist: string,
    album: string,
    genre: string
}

const SongItem = ({ title, artist, album, genre }: SelectionProps) => {
  return (
    <div>
        <div>
            <span>
                <span>
                    {title}
                </span>
                <p>
                    {album}
                </p>
            </span>
            
            <p>{artist}</p>
            <p>{genre}</p>
        </div>

        <div>
            <button>
                <RiEditFill />
            </button>

            <button>
                <RiDeleteBin7Fill />
            </button>
        </div>     
    </div>
  )
}

export default SongItem