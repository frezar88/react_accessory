import React from 'react';
import classes from './MySelect.module.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <FormControl sx={{m: 1, minWidth: 120}} size="small">
            <InputLabel id="my-select">{defaultValue}</InputLabel>
            <Select
                labelId="my-select"
                id="demo-select-small"
                className={classes.select}
                label={defaultValue}
                value={value}
                onChange={event => onChange(event.target.value)}
            >

                {
                    options.map(option =>
                        <MenuItem key={option.value} value={option.value}> {option.name}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
};

export default MySelect;