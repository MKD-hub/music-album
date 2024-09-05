import { Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import { Dispatch } from "@reduxjs/toolkit";
import { Formik } from 'formik';
import { ISong } from "../api/song.type";
import { useDispatch, useSelector } from "react-redux";
import { createSong, selectError, selectStatus } from "../app/createSong.slice";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
}


const createSongSubmit = (dispatch: Dispatch<any>, songData: ISong) => {
    dispatch(createSong(songData))
}

const CreateSongModal = ({ isOpen, onClose }: ModalProps) => {

    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Create a new song</ModalHeader>
            <ModalCloseButton />

            {/* The actual form */}
            <ModalBody>
                <Formik
                    initialValues={{
                        title: '',
                        artist: '',
                        album: '',
                        genre: ''
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        createSongSubmit(dispatch, values);
                        if (!(status === 'pending')) {
                            setSubmitting(false)
                            onClose()
                        }
                    }}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                    }) => (
                    <form onSubmit={handleSubmit}>
                        {!isSubmitting &&
                            <>
                                <FormControl>
                                    <FormLabel>title</FormLabel>
                                    <Input 
                                        type='text' 
                                        name="title" 
                                        value={values.title}
                                        onChange={handleChange('title')}
                                        required 
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>artist</FormLabel>
                                    <Input 
                                        type='text' 
                                        name="artist" 
                                        value={values.artist}
                                        onChange={handleChange('artist')}
                                        required 
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>album</FormLabel>
                                    <Input 
                                        type='text' 
                                        name="album" 
                                        value={values.album}
                                        onChange={handleChange('album')}
                                        required 
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>genre</FormLabel>
                                    <Input 
                                        type='text' 
                                        name="genre" 
                                        value={values.genre} 
                                        onChange={handleChange('genre')}
                                        required
                                    />
                                </FormControl>

                                <ModalFooter>
                                    <Button type="submit" colorScheme='blue'>
                                        Done
                                    </Button>  
                                </ModalFooter>
                            </>
                        }
                        {isSubmitting &&
                            <Button
                                isLoading
                                colorScheme="blue"
                            >
                                Continue
                            </Button>
                        }
                        {status === 'error' &&
                            <Text>
                                { error as String }
                            </Text>
                        }
                    </form>
                )}
                </Formik>
            </ModalBody>

            </ModalContent>
        </Modal>
    )
}

export default CreateSongModal