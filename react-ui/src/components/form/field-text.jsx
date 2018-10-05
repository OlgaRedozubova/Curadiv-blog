import React, { Component } from 'react';

//components
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';

class FieldText extends Component {
    render() {
        const { name, value, onChange, required, placeholder } = this.props;

        return (
            <Field>
                <Control>
                    <Input
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        placeholder={placeholder}
                    />
                </Control>
            </Field>
        )
    }
}

export default FieldText;

