import { Card, CardBody, CardHeader, Flex, IconButton, Spacer, Text, useToast } from '@chakra-ui/react';
import { RiDeleteBin7Fill, RiEditFill } from 'react-icons/ri';
import { Dispatch  } from '@reduxjs/toolkit';
import { deleteSong } from '../app/deleteSong.slice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import UpdateSongModal from './updateSongModal';
interface SelectionProps {
    _id: string | undefined,
    title: string,
    artist: string,
    album: string,
    genre: string
}


const handleDelete = (dispatch: Dispatch<any>, id: string | undefined, toast: any) => {
    dispatch(deleteSong(id))
    toast({
        title: 'deleting',
        description: `deleting song`,
        duration: 6000,
        isClosable: true,
        status: 'loading'
    })
}

const SongItem = ({ _id, title, artist, album, genre }: SelectionProps) => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const toast = useToast();

    return (
    <>
        <Card
            border={'1px solid white'}
        >
            <CardHeader fontSize={'2xl'} fontWeight={'bold'}>
                <Flex>
                    {title[0].toUpperCase() + title.substring(1)}

                    <Spacer />
                    <Flex gap={'8px'}>
                        <IconButton
                            onClick={() => setOpen(true)}
                            aria-label='edit'
                            size='md'
                            icon={<RiEditFill />}
                        />

                        <IconButton
                            onClick={() => handleDelete(dispatch, _id, toast)}
                            aria-label='delete'
                            size='md'
                            icon={<RiDeleteBin7Fill />}
                        />
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text fontSize={'lg'}>
                    Artist • {artist}
                </Text>
                <Text fontSize={'lg'}>
                    Album • {album}
                </Text>
                <Text fontSize={'lg'}>
                    Genre • {genre}
                </Text>
            </CardBody>
        </Card>

        <UpdateSongModal isOpen={open} onClose={() => setOpen(false)} songData={{ _id, title, artist, album, genre }} />
    </>
    )
}

export default SongItem