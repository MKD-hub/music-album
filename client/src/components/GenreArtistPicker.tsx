import { Box, Button, Heading, Container, Flex, Center, Spacer, Wrap, WrapItem } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, selectGenres } from "../app/genres.slice"

interface GenreArtistPickerProps {
    selection: string,
    setSelection: Dispatch<SetStateAction<string>>,
    selectionsList: string[]
}


const HandleChange = (dispatch: Dispatch<any>, genres: boolean) => {
  if (genres) {
    dispatch(getGenres());
  }
  
}

const GenreArtistPicker = () => {

  useEffect(() => {
    dispatch(getGenres());
  }, [])


  const dispatch = useDispatch();
  const [selection, setSelection] = useState('Genre');
  const selectionList = useSelector(selectGenres)

  console.log(selectionList, "testing")
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
           <Button>
              {selection.genre}
           </Button>
          );
        })}
      </Wrap>

    </Box>
  )
}

export default GenreArtistPicker