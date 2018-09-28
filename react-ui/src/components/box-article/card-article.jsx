import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Card } from 'react-bulma-components';


class CardArticle extends Component {
    render() {
        const { article } = this.props;

        return (
            <Box className="is-pulled-right" onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">
                    <Card>
                        {article.splash &&
                        <Card.Image src={require('../../assets/images/' + article.splash)}/>
                        }
                        <Card.Content>
                            <Content>
                                <h3 className=".subtitle">{article.subtitle}</h3>
                                <h2 className=".title">{article.title}</h2>
                            </Content>
                        </Card.Content>
                    </Card>
                </Link>
            </Box>
        )
    }
}

export default CardArticle;