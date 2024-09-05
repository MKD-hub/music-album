import { useEffect, useState } from "react"
import SongItem from "./components/SongItem"
import { useSelector, useDispatch} from "react-redux"
import { getSongs, selectError, selectPageNumber, selectSongs, selectStatus, incrementPage, decrementPage, selectTotalPages } from "./app/song.slice"
import GenreArtistPicker from "./components/GenreArtistPicker";
import { Box, Button, ButtonGroup, Container, Divider, Flex, IconButton, Skeleton, Image, Text, Link } from "@chakra-ui/react";
import { RiAddFill } from "react-icons/ri";
import GenericListView from "./components/GenericListView";
import { Dispatch } from "@reduxjs/toolkit";
import Error from './assets/error.svg';
import CreateSongModal from "./components/CreateSongModal";

const handlePageChange = (dispatch: Dispatch<any>, increment: boolean) => {
  if (increment) {
    dispatch(incrementPage())
  }
  else {
    dispatch(decrementPage())
  }

}


function App() {

  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectPageNumber);
  const totalPages = useSelector(selectTotalPages);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
      try {
        dispatch(getSongs(currentPage))  
      }
      catch(error) {
        console.log(error);
      }
  }, [currentPage])

  

  return (
    <Box
      padding={{ base: '36px', sm: '64px'}}
    >

      <Box>
        {/* Search bar */}

      </Box>

      <section>
        {/* Filtering section, filter by genre or artist */}
        <Box>
          <GenreArtistPicker/>
        </Box>

        {/* List of Badges, that when pressed refetch songs of that genre / artist */}
      </section>

      <Divider />

      <Box
        marginTop={'48px'}
      >
        {status === 'pending' &&
          <Flex
            flexDirection={'column'}
            gap={'32px'}
          >
            <Skeleton
              height={{ base: '100px', sm: '203px'}}
              rounded={'lg'}
            />
            <Skeleton
              height={{ base: '100px', sm: '203px'}}
              rounded={'lg'}
            />
            <Skeleton
              height={{ base: '100px', sm: '203px'}}
              rounded={'lg'}
            />
          </Flex>
        }

        {status === 'success' &&
          <GenericListView
            list={songs}
            renderItem={(song) =>
              <SongItem
                title={song.title}
                artist={song.artist}
                album={song.album}
                genre={song.genre}
              />
            }
          />
        }

        {status === 'error' &&
          <Container>
            <Image 
              boxSize={'300px'}
              src={Error}
              objectFit={'cover'}
              alt='error'
            />

            <Text
              textAlign={{ base: 'center', sm: 'left'}}
              paddingLeft={{ sm: '48px'}}
              marginTop={'18px'}
            >
              Maybe try <Link href="/" color={'blue'}>refreshing</Link> the page
              <br/>
              {status === 'error' ? error as String : 'oops something went wrong'}
            </Text>
          </Container>
        }

        {status === 'success' && 
          <ButtonGroup
            marginTop={'32px'}
          >
            <Button
              onClick={ () => handlePageChange(dispatch, false) }
              isDisabled={currentPage === 1}
            >
              Prev
            </Button>

            <Button
              onClick={ () => handlePageChange(dispatch, true) }
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </ButtonGroup>
        }

      </Box>

      {/* Create Modal */}
      <CreateSongModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />


      {/* Create Song Button */}
      
      <IconButton
        // bg={theme.colors} make this color secondary
        position={'fixed'}
        bottom={{ base: '3rem', sm: '1rem' }}
        right={'36px'}
        aria-label="fab"
        size='lg'
        rounded={'full'}
        icon={<RiAddFill size={'md'} />}
        onClick={() => setOpenModal(true)}
      />
    
    </Box>
  )
}

export default App
