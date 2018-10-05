import React, { Component } from 'react';

//components
import { Field, Control, Input, Label } from 'react-bulma-components/lib/components/form';

class FieldSlot extends Component {
    render() {
        const { label='', name='', value="", onChange, required=false } = this.props;
        return (

            <Field>
                <Label>{label}</Label>
                <Control>
                    <Input
                        type="number"
                        name={name}
                        onChange={onChange}
                        required={required}
                        value={value.toString()}
                        min="1"
                        max="12"
                    />
                </Control>
            </Field>
        )
    }
}

export default FieldSlot;

