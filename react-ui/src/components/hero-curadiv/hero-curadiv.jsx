import React, { Component } from 'react';
import { Hero, Container, Heading } from 'react-bulma-components/lib';

//style
import './hero-curadiv.scss';

class HeroCuradiv extends Component {
    render() {
        return(
            <Hero className="HeroCuradiv" color="info">
                <Container>
                    <Hero.Body>
                        <Heading>Curadiv</Heading>
                    </Hero.Body>
                </Container>
            </Hero>
        )
    }
}

export default HeroCuradiv;