import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppTable from '../../components/AppTable/AppTable';
import AddRoute from '../../components/AddRoute/AddRoute';
import SearchTable from '../../components/SearchTable/SearchTable';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import { getTrainsThunk } from "../../store/trains_reducer";
import { Button } from '@mui/material';

import './Home.css';

function Home() {
    const [isAddRoute, setIsAddRoute] = useState(false);
    const dispatch = useDispatch();
    const trains = useSelector(state => state.trains_reducer.trainsFilter);
    const isDeleteRoute = useSelector(state => state.trains_reducer.isDeleteRoute);

    useEffect(() => {
        dispatch(getTrainsThunk())
    }, []);

    return (
        <div className="home">
            <div>
                <p className="home__text-create">Create a train schedule</p>
                <Button variant="contained" size="medium" onClick={() => setIsAddRoute(true)}>
                    + create
                </Button>
            </div>

            <SearchTable />

            { isAddRoute && <AddRoute isAddRoute={isAddRoute} setIsAddRoute={setIsAddRoute}/> }

            { isDeleteRoute && <DeleteModal isDeleteRoute={isDeleteRoute} /> }

            <AppTable items={trains} setIsAddRoute={setIsAddRoute}/>
        </div>
    );
}

export default Home;