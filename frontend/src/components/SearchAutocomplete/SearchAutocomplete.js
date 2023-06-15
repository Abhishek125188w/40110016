import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

import './SearchAutocomplete.css';

export default function SearchAutocomplete({search, setItems}) {
    const trains = useSelector(state => state.trains_reducer.trainsFilter);

    const handleChange = (value) => {
        setItems(search, value)
    }

    return (
        <Autocomplete
            className='search-autocomplete__item'
            onChange={(event, newValue) => {
                handleChange(newValue);
            }}
            disablePortal
            options={[...new Set(trains.map(el => el = el[search]))]}
            renderInput={(params) => <TextField {...params} label={`Enter ${search}`} />}
        />
    );
}
