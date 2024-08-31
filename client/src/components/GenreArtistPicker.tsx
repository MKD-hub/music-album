import { Dispatch, SetStateAction } from "react"

interface GenreArtistPickerProps {
    selection: 'string',
    setSelection: Dispatch<SetStateAction<string>>
}

const GenreArtistPicker = ({ selection, setSelection }: GenreArtistPickerProps) => {
  return (
    <div>GenreArtistPicker</div>
  )
}

export default GenreArtistPicker