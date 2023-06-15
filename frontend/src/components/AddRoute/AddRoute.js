import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRouteThunk, trainsEdit, trainsOldDeleteThunk } from '../../store/trains_reducer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

import './AddRoute.css';

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

export default function AddRoute({isAddRoute, setIsAddRoute}) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [start, setStart] = useState('');
    const [finish, setFinish] = useState('');
    const [price, setPrice] = useState('');
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const edit = useSelector(state => state.trains_reducer.edit);

    useEffect(() => {
        if (edit !== null) {
            setId(edit.id)
            setName(edit.name)
            setFrom(edit.from)
            setTo(edit.to)
            setStart(edit.start)
            setFinish(edit.finish)
            setPrice(edit.price)
        }
    }, [edit]);

    const handleSend = () => {
        if (id.length && name.length && from.length && to.length && start.length && finish.length && price.length ) {
            const newRoute = {
                id: id,
                name: name,
                from: from,
                to: to,
                start: start,
                finish: finish,
                price: price,
            };
            if (edit !== null) {
                dispatch(trainsOldDeleteThunk(edit.id))
            }
            dispatch(addRouteThunk(newRoute))
            setIsAddRoute(false)
        } else {
            setIsError(true)
        }
    };

    const handleClose = () => {
        dispatch(trainsEdit(null))
        setIsAddRoute(false)
    }

    return (
        <div>
            <Modal
                open={isAddRoute}
                onClose={handleClose}
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField className="add-route_form-item" onChange={(e) => setId(e.target.value.trim())} value={id} id="outlined-basic" label="Enter id" variant="outlined" />
                    <TextField className="add-route_form-item" onChange={(e) => setName(e.target.value.trim())} value={name} id="outlined-basic" label="Enter name" variant="outlined" />
                    <TextField className="add-route_form-item" onChange={(e) => setFrom(e.target.value.trim())} value={from} id="outlined-basic" label="Enter from" variant="outlined" />
                    <TextField className="add-route_form-item" onChange={(e) => setTo(e.target.value.trim())} value={to} id="outlined-basic" label="Enter to" variant="outlined" />
                    <TextField className="add-route_form-item" onChange={(e) => setStart(e.target.value.trim())} value={start} id="outlined-basic" label="Enter start" variant="outlined" />
                    <TextField className="add-route_form-item" onChange={(e) => setFinish(e.target.value.trim())} value={finish} id="outlined-basic" label="Enter finish" variant="outlined" />
                    <TextField className="add-route_form-item" onChange={(e) => setPrice(e.target.value.trim())} value={price} id="outlined-basic" label="Enter price" variant="outlined" />
                    <div className="add-route_btn-wrap">
                        <Button onClick={handleSend} variant="contained" size="medium">
                            create
                        </Button>
                        <Button onClick={() => setIsAddRoute(false)} variant="contained" color="error" size="medium">
                            cancel
                        </Button>
                    </div>
                    { isError && (<div className="add-route_form-error">!!!You need to fill everything!!!</div>)}
                </Box>
            </Modal>
        </div>
    );
}
