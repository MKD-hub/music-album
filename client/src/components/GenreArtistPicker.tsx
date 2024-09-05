import { Box, Button, Heading, Flex, Center, Spacer, Wrap } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, selectGenres } from "../app/genres.slice"

import { IGenre, IArtist } from "../api/song.type"

const HandleChange = (dispatch: Dispatch<any>, genresSelected: boolean, genres: IGenre[], artists: IArtist[], setSelectionList: Dispatch<SetStateAction<IGenre[] | IArtist[]>> ) => {
  if (genresSelected) {
    setSelectionList(genres) 
  }
  else {
    if (artists.length > 0) {
      setSelectionList(artists)
      // if artists was fetched before, do not refetch
    }
    else {
      // fetch artists here and setSelectionList
    }
  }
  
}



const GenreArtistPicker = () => {

  const genres = useSelector(selectGenres);
  
  useEffect(() => {
    dispatch(getGenres());
    setSelectionList(genres)
  }, [genres])
  
  
  const dispatch = useDispatch();
  const [selection, setSelection] = useState('Genre');
  const [selectionList, setSelectionList] = useState<IGenre[]>([]); // use selectors to get genres or artists and set this to a state


  

  return (
    <Box
      maxW={'100ch'}
      marginBottom={'20px'}
    > 

      <Flex
        flexDirection={{ base: 'column', sm: 'row' }}
      >
        <Heading 
          size='3xl'
          as='h1'
          noOfLines={1}
          marginBottom={{ base: '20px', sm: '0px'}}
        >
          Pick { selection }
        </Heading>

        <Spacer />

        <Center w={{ base: '100%', sm: '62%' }} justifyContent={{ base: 'flex-start', sm: 'center'}}>
          <Box display={'flex'} gap={'1rem'}>
            <Button onClick={() => setSelection('Genre')}>
              Genre
            </Button>

            <Button onClick={() => setSelection('Artist')}>
              Artist
            </Button>
          </Box>
        </Center>

      </Flex>

      <Wrap
        marginTop={'12px'} 
      >
        {selectionList.map((selection) => {
          return(
           <Button key={selection.genre}>
              {selection.genre}
              ({selection.count})
           </Button>
          );
        })}
      </Wrap>

    </Box>
  )
}

export default GenreArtistPicker