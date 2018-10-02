import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content, Box, Media, Image, Columns } from 'react-bulma-components';



class BoxArticle extends Component {
    render() {
        const { article } = this.props;

        return (
            <Box onClick={()=>this.props.onClick(article)}>
                <Link to={`/article/${article._id}`} className="navbar-brand">
                    <Columns>
                        <Columns.Column>

                                {article.splash &&
                                <Image src={require('../../assets/images/' + article.splash)}/>
                                }


                        </Columns.Column>
                        <Columns.Column>

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