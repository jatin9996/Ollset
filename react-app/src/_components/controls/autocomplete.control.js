import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import CreatableSelect from 'react-select/creatable';


const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};


const formatGroupLabel = data => (
  <div >
    Rochak
  </div>
);

export const AutoCompleteControl = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.value);
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setSelectedValue(newValue);
    props.change(newValue);
  }

  return <>
      <Form.Label className="make-float">Invitees</Form.Label>
      <CreatableSelect
        value={selectedValue}
        isMulti
        onChange={handleChange}
        options={props.options}
        valueComponent={formatGroupLabel}
      />
  </>;

}