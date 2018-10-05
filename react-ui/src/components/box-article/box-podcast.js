import React, { Component } from 'react';

import { Box, Columns } from 'react-bulma-components';
import { getImage } from "../image/image";


class BoxPodcast extends Component {
    render() {
        const { author, splash } = this.props.podcast;

        return (
            <Box className="has-background-info is-full-width">
                <Columns className="is-tablet">
                    <Columns.Column className="has-text-centered">
                        <h1 className="title has-text-white">curadiv<strong className="has-text-black">podcast</strong></h1>
                        <h2 className="subtitle has-text-white"> {author}</h2>
                    </Columns.Column>
                    <Columns.Column className="is-flex-mobile is-center">
                        {getImage(splash, 'podcast')}
                    </Columns.Column>
                </Columns>
            </Box>
        )
    }
}

export default BoxPodcast;