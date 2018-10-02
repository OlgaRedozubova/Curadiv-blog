import React, { Component } from 'react';

import { Content, Box, Media,  Columns, Image } from 'react-bulma-components';


class Podcast extends Component {
    render() {
        const { podcast } = this.props;
        return (
            <Box className="has-background-info is-full-width">
                <Columns className="is-tablet">
                    <Columns.Column className="has-text-centered">
                        <h1 className="title has-text-white">curadiv<strong className="has-text-black">podcast</strong></h1>
                        <h2 className="subtitle has-text-white"> {podcast.author}</h2>
                    </Columns.Column>
                    <Columns.Column className="is-flex-mobile is-center">
                        <Image src={require('../../assets/images/podcast.png')}/>
                    </Columns.Column>
                </Columns>
            </Box>
        )
    }
}

export default Podcast;