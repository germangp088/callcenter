import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
  
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const Phone = (props) => {

  const onChange = (e, eAttr, attr) =>{
    props.onChange(e, eAttr, attr, '(   )    -    ');
  }

  return (
    <Grid item xs={12} sm={6}>
      <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">Phone</InputLabel>
        <Input
          required
          value={props.contact_number}
          error={props.values.phoneError}
          helperText={props.values.phoneError && "Phone is required."}
          onChange={(e)=> onChange(e, "phoneError", "contact_number")}
          onBlur={(e) => props.onBlur(e, "contact_number")}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
    </Grid>
  );
}

export default Phone;