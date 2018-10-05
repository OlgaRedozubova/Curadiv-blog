import React from 'react';

//components
import Form from '../form/form-article';
import HeroCuradiv from '../hero-curadiv/hero-curadiv';
import { Container, Section} from 'react-bulma-components';


export default class AdminArticle extends React.Component {
    render() {
        const { id='' } = this.props.match.params;
        const textHeader = id ? "Edit article" : "New article";
        return (
            <div className="admin-article">
                <HeroCuradiv />
                <Section>
                    <Container >
                        <Form title={textHeader} id={id}/>
                    </Container>
                </Section>
            </div>
        );
    }
}


