import { Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Formik } from 'formik';

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
}

const CreateSongModal = ({ isOpen, onClose }: ModalProps) => {
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
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                 {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                <form onSubmit={handleSubmit}>
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
                </form>
            )}
            </Formik>
          </ModalBody>

        </ModalContent>
    </Modal>
  )
}

export default CreateSongModal