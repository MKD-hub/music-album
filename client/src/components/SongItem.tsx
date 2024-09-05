import { Card, CardBody, CardHeader, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { RiDeleteBin7Fill, RiEditFill } from 'react-icons/ri';

interface SelectionProps {
    title: string,
    artist: string,
    album: string,
    genre: string
}

const SongItem = ({ title, artist, album, genre }: SelectionProps) => {
  return (
   <Card
    border={'1px solid white'}
   >
    <CardHeader fontSize={'2xl'} fontWeight={'bold'}>
        <Flex>
            {title[0].toUpperCase() + title.substring(1)}

            <Spacer />
            <Flex gap={'8px'}>
                <IconButton
                    aria-label='edit'
                    size='md'
                    icon={<RiEditFill />}
                />

                <IconButton
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
  )
}

export default SongItem