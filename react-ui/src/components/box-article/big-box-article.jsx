import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Media,  Columns, Image } from 'react-bulma-components';
import  getImage  from '../image/image';


class BigBoxArticle extends Component {
    render() {
        const { article } = this.props;
        return (
            <Box className="is-shadowless is-paddingless-bottom" onClick={()=>this.props.onClick(article)}>
                <div className="is-border-bottom">
                    <Link to={`/article/${article._id}`} className="navbar-brand">
                        <Media className="is-fluid">
                            <Columns className="is-desktop">
                                <Columns.Column>
                                    <Media.Item>
                                        <Content>
                                            <h5 className="SURtitle">{article.SURtitle}</h5>
                                            <h1 className="title">{article.title}</h1>
                                            <p className="subtitle"><i>{article.subtitle}</i></p>

                                        </Content>
                                    </Media.Item>

                                </Columns.Column>
                                <Columns.Column >
                                    <Media.Item position="right">
                                        {getImage(article.splash)}
                                        {/*{getImage(article.splash, "is-735x418")}*/}
                                        {/*<Image src={require('../../assets/images/'+article.splash)} className="is-735x418"/>*/}
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