import { Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Dispatch } from "@reduxjs/toolkit";
import { Formik } from 'formik';
import { ISong } from "../api/song.type";
import { useDispatch } from "react-redux";
import { updateSong } from "../app/updateSong.slice";
interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    songData: ISong
}


const updateSongSubmit = (dispatch: Dispatch<any>, songData: ISong) => {
    dispatch(updateSong(songData))
}

const UpdateSongModal = ({ isOpen, onClose, songData }: ModalProps) => {

    const dispatch = useDispatch();

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
                        _id: songData._id,
                        title: songData.title,
                        artist: songData.artist,
                        album: songData.album,
                        genre: songData.genre
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        updateSongSubmit(dispatch, values);
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
                                        placeholder={songData.title}
                                        name="title" 
                                        value={values.title}
                                        onChange={handleChange('title')}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>artist</FormLabel>
                                    <Input 
                                        type='text' 
                                        placeholder={songData.artist}
                                        name="artist" 
                                        value={values.artist}
                                        onChange={handleChange('artist')}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>album</FormLabel>
                                    <Input 
                                        type='text' 
                                        placeholder={songData.album}
                                        name="album" 
                                        value={values.album}
                                        onChange={handleChange('album')}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>genre</FormLabel>
                                    <Input 
                                        type='text' 
                                        placeholder={songData.genre}
                                        name="genre" 
                                        value={values.genre} 
                                        onChange={handleChange('genre')}
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
                    </form>
                )}
                </Formik>
            </ModalBody>

            </ModalContent>
        </Modal>
    )
}

export default UpdateSongModal