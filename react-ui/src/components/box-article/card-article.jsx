import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Card, Tile } from 'react-bulma-components';


class CardArticle extends Component {
    render() {
        const { article } = this.props;

        return (
            <Box className="is-shadowless is-pulled-right is-full-height" onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">
                    <Card className="is-shadowless">
                        {article.splash &&
                        <Card.Image src={require('../../assets/images/' + article.splash)}/>
                        }
                        <Card.Content>
                            <Content>
                                <h6 className="SURtitle">{article.SURtitle}</h6>
                                <h2 className="title">{article.title}</h2>
                            </Content>
                        </Card.Content>
                    </Card>
                </Link>
            </Box>
        )
    }
}

export default CardArticle;