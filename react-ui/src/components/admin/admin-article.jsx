import React from 'react';

//components
import Form from '../form/form-article';

import { Container, Section} from 'react-bulma-components';


export default class AdminArticle extends React.Component {
    render() {
        const { id='' } = this.props.match.params;
        const textHeader = id ? "Edit article" : "New article";
        return (
            <Section>
                <Container >
                    <Form title={textHeader} id={id}/>
                </Container>
            </Section>
        );
    }
}


