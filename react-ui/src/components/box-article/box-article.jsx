import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Media, Image } from 'react-bulma-components';


class BoxArticle extends Component {
    render() {
        const { article } = this.props;

        return (
            <Box onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">
                    <Media>
                        <Media.Item position="left">
                        {article.splash &&
                            <Image src={require('../../assets/images/' + article.splash)}/>
                        }

                        </Media.Item>
                        <Media.Item>
                            <Content>
                                <h4 className=".subtitle">{article.subtitle}</h4>
                                <h3 className=".title">{article.title}</h3>
                            </Content>
                        </Media.Item>
                    </Media>
                </Link>
            </Box>
        )
    }
}

export default BoxArticle;