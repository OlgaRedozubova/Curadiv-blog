import React from 'react';

//components
import Form from '../form/form';

import { Container, Section, Hero, Heading} from 'react-bulma-components';


export default class ArticleEdit extends React.Component {
    render() {
        const { id='' } = this.props.match.params;
        const textHeader = id ? "Edit article" : "New article";
        return (
            <div>
                <Hero>
                    <Container className="is-fluid">
                        <Hero.Body>
                            <Heading>{textHeader}</Heading>
                        </Hero.Body>
                    </Container>
                </Hero>
                <Section>
                    <Container className="is-fluid">
                        <Form id={id}/>
                </Container>
                </Section>
            </div>
        );
    }
}
