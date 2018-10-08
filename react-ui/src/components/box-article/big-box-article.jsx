import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Media,  Columns } from 'react-bulma-components';
import  { getImage }   from '../image/image';


class BigBoxArticle extends Component {
    render() {
        const { article } = this.props;
        return (
            <Box className="BigBoxArticle is-radiusless is-shadowless is-full-width" onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">
                        <Columns gapless className="is-full-width">
                            <Columns.Column className="columns__Content">
                                    <Content>
                                        <h5 className="SURtitle">{article.SURtitle}</h5>
                                        <h1 className="title">{article.title}</h1>
                                        <p className="subtitle"><i>{article.subtitle}</i></p>

                                    </Content>

                            </Columns.Column>
                            <Columns.Column className="column__Img">
                                    {getImage(article.splash)}
                            </Columns.Column>
                        </Columns>
                </Link>
            </Box>
        )
    }
}

export default BigBoxArticle;