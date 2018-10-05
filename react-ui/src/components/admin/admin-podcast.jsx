import React from 'react';

//components
import FormPodcast from '../form/form-podcast';
import HeroCuradiv from '../hero-curadiv/hero-curadiv';

import { Container, Section } from 'react-bulma-components';


export default class AdminPodcast extends React.Component {
    render() {
        const { id='' } = this.props.match.params;
        const textHeader = id ? "Edit podcast" : "New podcast";
        return (
            <div className="admin-podcast">
                <HeroCuradiv />
                <Section>
                    <Container className="is-fluid">
                        <FormPodcast title={textHeader} id={id}/>
                    </Container>
                </Section>
            </div>
        );
    }
}


