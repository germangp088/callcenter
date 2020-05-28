import React from 'react';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
      
const Currency = (props) => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Select currency
            </Typography>
            {props.currencies.map((c) => {
                return <FormControlLabel value={c.symbol} control={<Radio
                    key={`Currency_${c.id}`}
                    checked={props.currency.id === c.id}
                    onChange={() => props.changeCurrency(c)}
                    value={c.symbol}
                    name="radio-button-currency"
                />} label={c.currency} />
            })}
        </React.Fragment>
    );
}
      
export default Currency;