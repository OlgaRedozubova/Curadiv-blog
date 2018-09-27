import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Media, Image } from 'react-bulma-components';


class BigBoxArticle extends Component {
    render() {
        const { article } = this.props;
        return (
            <Box onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">
                    <Media>

                        <Media.Item>
                            <Content>
                                <h2 className=".subtitle">{article.subtitle}</h2>
                                <h1 className=".title">{article.title}</h1>
                                <p>
                                    {article.body}
                                </p>
                            </Content>
                        </Media.Item>

                        <Media.Item position="right" size={5} style={{ width: '70%' }}>
                            <Image
                                src={require('../../assets/images/' + article.splash)}/>
                        </Media.Item>
                    </Media>
                </Link>
            </Box>
        )
    }
}

export default BigBoxArticle;