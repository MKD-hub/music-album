import { Box, Button, Heading, Flex, Center, Spacer, Wrap } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, selectGenres } from "../app/genres.slice"

import { IGenre, IArtist } from "../api/song.type"
import { getSongsByGenre } from "../app/song.slice"

const GenreArtistPicker = () => {

  const genres = useSelector(selectGenres);
  
  useEffect(() => {
    dispatch(getGenres());
    setSelectionList(genres)

    // used genres.length in dependency array instead of genres to avoid infinite API calls
  }, [genres.length])
  
  
  const dispatch = useDispatch();
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
          Pick Genre
        </Heading>

      </Flex>

      <Wrap
        marginTop={'12px'} 
      >
        {selectionList.map((selection) => {
          return(
           <Button 
            key={selection.genre}
            onClick={() => dispatch(getSongsByGenre(selection.genre))}
           >
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