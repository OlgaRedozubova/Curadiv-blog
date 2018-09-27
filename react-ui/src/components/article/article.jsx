import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

import { Hero, Container, Heading, Section, Media, Image, Content } from 'react-bulma-components';

import {fetchArticle} from '../../stores/_actions/article';

//style
import './article.css';


class Article extends Component {
    componentWillMount() {
        const {params} = this.props.match;
        console.log('componentWillMount=>', this.props);
        this.props.fetchArticle(params.id);
        // if (!this.props.selectArticle){
        //     this.props.fetchArticle();
        // }
    }

    render() {
        const { selectArticle, loading, article } = this.props;

        if (loading || !article) {
            return <div>Loading...</div>;
        }

        return(
            <div className="article">
                <Hero color="info">
                    <Container className="is-fluid">
                        <Hero.Body>
                            <Heading>Curadiv</Heading>
                        </Hero.Body>
                    </Container>
                </Hero>
                <Section className="is-paddingless">
                    <Container className="is-fluid">
                        <Media>
                            <Media.Item className="is-fluid">
                                {article.splash &&
                                    <Image
                                        src={require('../../assets/images/' + article.splash)}/>
                                }

                            </Media.Item>
                        </Media>
                    </Container>
                </Section>
                <Section className="is-paddingless">
                    <Container className="is-fluid">
                        <Media>
                            <Media.Item className="is-fluid">
                                <Content>
                                    <h1 className=".title">{article.title}</h1>
                                    <h2 className=".subtitle">{article.subtitle}</h2>
                                    <h3 className=".subtitle">{article.author}</h3>

                                    <p>
                                        {article.body}
                                    </p>
                                </Content>
                            </Media.Item>
                        </Media>
                    </Container>
                </Section>
            </div>
        )
    }

}

const mapStateToProps = state =>
    ({
        selectArticle: state.articles.selectArticle,
        article: state.article.items,
        loading: state.article.loading,
        error: state.article.error,
    });

const mapActionToProps = (dispatch) => {
    return {
        fetchArticle: bindActionCreators(fetchArticle, dispatch)
    }
};

export default connect(mapStateToProps, mapActionToProps)(Article);