import React, { Component } from 'react';

//components
import { Field, Control, Textarea, Label } from 'react-bulma-components/lib/components/form';

class FieldMessage extends Component {
    render() {
        const { label='', name='', value='', onChange, required=false, placeholder='' } = this.props;

        return (
            <Field>
                <Label>{label}</Label>
                <Control>
                    <Textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        placeholder={placeholder}
                        rows={30}
                    />
                </Control>
            </Field>
        )
    }
}

export default FieldMessage;

