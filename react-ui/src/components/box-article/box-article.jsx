import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Media, Image, Columns } from 'react-bulma-components';



class BoxArticle extends Component {
    render() {
        const { article } = this.props;

        return (
            <Box className="is-paddingless is-shadowless is-radiusless" onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">
                    <Columns>
                        <Columns.Column narrow>

                                {article.splash &&
                                <Image src={require('../../assets/images/' + article.splash)} />
                                }


                        </Columns.Column>
                        <Columns.Column className="content">

                        <Content>
                            <h4 className="SURtitle">{article.SURtitle}</h4>
                            <h3 className="title">{article.title}</h3>
                        </Content>

                        </Columns.Column>
                    </Columns>
                </Link>
            </Box>
        )
    }
}

export default BoxArticle;