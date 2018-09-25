import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Hero, Container,Content, Heading, Section, Level, Box, Media, Image, Card } from 'react-bulma-components';

class BoxCard extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        const { article } = this.props;
        return (
            <Box className="is-pulled-right">
                <Link to={`/article/${article._id}`} className="navbar-brand">
                <Card>
                    <Card.Image src ={require('../../assets/images/01.png')}/>
                    <Card.Content>
                        <Content>
                            <p>
                                {article.title}
                            </p>
                            <p>
                                {article.subtitle}
                            </p>

                        </Content>
                    </Card.Content>
                </Card>
                </Link>
            </Box>
        )
    }
}

export default BoxCard;