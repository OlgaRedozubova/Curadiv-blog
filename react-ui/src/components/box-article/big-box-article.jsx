import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Media,  Columns } from 'react-bulma-components';
import  getImage  from '../image/image';


class BigBoxArticle extends Component {
    render() {
        const { article } = this.props;
        return (
            <Box onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">

                    <Media>
                        <Columns>
                            <Columns.Column>
                                <Media.Item>
                                    <Content>
                                        <h2 className="subtitle">{article.subtitle}</h2>
                                        <h1 className="title">{article.title}</h1>
                                        <p>
                                            {article.body}
                                        </p>
                                    </Content>
                                </Media.Item>
                            </Columns.Column>
                            <Columns.Column className="is-two-thirds">
                                <Media.Item >
                                    {getImage(article.splash, "01.png")}
                                </Media.Item>
                            </Columns.Column>
                        </Columns>
                    </Media>
                </Link>
            </Box>
        )
    }
}

export default BigBoxArticle;