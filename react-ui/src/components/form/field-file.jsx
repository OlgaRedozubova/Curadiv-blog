import React, { Component } from 'react';

//components
import { Field, Label, Control } from 'react-bulma-components/lib/components/form';

class FieldFile extends Component {
    render() {
        const { label='', name='', onChange, splash='' } = this.props;

        return (
            <Field>
                <Label>{label}</Label>
                <Control className="file has-name">
                    <label className="file-label">
                        <input
                            className="file-input"
                            type="file"
                            name={name}
                            accept=".png"
                            onChange={onChange}
                        />
                        <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                            Choose a file…
                        </span>
                    </span>
                        <span className="file-name">
                            {splash}
                        </span>
                    </label>
                </Control>
            </Field>
        )
    }
}

export default FieldFile;

