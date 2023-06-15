import { useDispatch } from 'react-redux';
import { modalOpen, trainsDeleteThunk } from "../../store/trains_reducer";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './DeleteModal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeleteModal({isDeleteRoute}) {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(modalOpen(null))
    }

    const handleDelete = () => {
        dispatch(trainsDeleteThunk())
    }

    return (
        <div>
            <Modal
                open={isDeleteRoute}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        This will delete it permanently and you won't be able to get it back.
                    </Typography>
                    <div className="delete-modal_btn-wrap">
                        <Button onClick={handleDelete} variant="contained" size="medium">
                            delete
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="error" size="medium">
                            no delete
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}