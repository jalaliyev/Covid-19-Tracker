import React from 'react'
import {FormControl, Select, MenuItem} from '@material-ui/core';

function SelectTypeofCases() {

    return (
        <div className='typeOfCases'>
            {/*  <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>  */}

          <FormControl className='table_dropdown'>
              <Select 
              variant='outlined'
              onChange={onCaseChange}
              value='cases'>
                  <MenuItem value='Total Cases'>Total Cases</MenuItem>
              </Select>
          </FormControl>
        </div>
    )
}

export default SelectTypeofCases
