import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Media,  Columns } from 'react-bulma-components';
import  { getImage }   from '../image/image';


class BigBoxArticle extends Component {
    render() {
        const { article } = this.props;
        return (
            <Box className="BigBoxArticle is-shadowless is-paddingless-bottom is-full-width" onClick={()=>this.props.onClick(article)}>
                <div className="is-border-bottom">
                    <Link to={`/article/${article._id}`} className="navbar-brand">
                        <Media className="is-full-width">
                            <Columns gapless breakpoint="tablet" className="is-full-width">
                                <Columns.Column>
                                    <Media.Item>
                                        <Content>
                                            <h5 className="SURtitle">{article.SURtitle}</h5>
                                            <h1 className="title">{article.title}</h1>
                                            <p className="subtitle"><i>{article.subtitle}</i></p>

                                        </Content>
                                    </Media.Item>

                                </Columns.Column>
                                <Columns.Column
                                                // mobile={{
                                                //     size: 'three-quarters',
                                                // }}
                                                tablet={{
                                                    size: 'two-thirds',
                                                }}
                                                desktop={{
                                                    size: 'two-thirds',
                                                }}
                                                widescreen={{
                                                    size: 'two-thirds',
                                                }}
                                                fullhd={{
                                                    size: 'two-thirds',
                                                }}>
                                    <Media.Item position="right">
                                        {getImage(article.splash)}
                                    </Media.Item>
                                </Columns.Column>
                            </Columns>
                        </Media>
                    </Link>
                </div>
            </Box>
        )
    }
}

export default BigBoxArticle;