import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Card } from 'react-bulma-components';
import { getImage } from "../image/image";

class CardArticle extends Component {
    render() {
        const { article } = this.props;

        return (
            <Box className="is-paddingless is-radiusless is-shadowless is-pulled-right is-full-height" onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">
                    <div className="box__block">
                        <Card className="is-shadowless">
                            { getImage(article.splash, article.slot)}
                            <Card.Content>
                                <Content>
                                    <h6 className="SURtitle">{article.SURtitle}</h6>
                                    <h2 className="title">{article.title}</h2>
                                </Content>
                            </Card.Content>
                        </Card>
                    </div>
                </Link>
            </Box>
        )
    }
}

export default CardArticle;