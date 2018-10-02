import React, { Component } from 'react';

import { Content, Box, Media,  Columns, Image } from 'react-bulma-components';


class Podcast extends Component {
    render() {
        const { podcast } = this.props;
        return (
            <Box className="has-background-info is-fullwidth">
                <Columns className="is-tablet">
                    <Columns.Column className="has-text-centered">
                        <h1 >curadiv<strong>podcast</strong></h1>
                        <h2 > {podcast.author}</h2>
                    </Columns.Column>
                    <Columns.Column className="is-flex-mobile is-center">
                        <Image src={require('../../assets/images/podcast.png')} className="is-340x146"/>
                    </Columns.Column>
                </Columns>
            </Box>
        )
    }
}

export default Podcast;