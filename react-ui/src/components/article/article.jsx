import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

import { Container, Section, Media} from 'react-bulma-components';
import Content from 'react-bulma-components/lib/components/content';

import {fetchArticle} from '../../stores/_actions/article';

import { getImageArticle } from "../image/image";
import ArticleBody from "./article-body";
import HeroCuradiv from '../hero-curadiv/hero-curadiv';

//style
import './article.css';



class Article extends Component {
    constructor (props) {
        super (props);
        this.state = {
            article: null,
            isLoading: false,
            title: '',
            subtitle: '',
            SURtitle: '',
            author: '',
            splash:'',
            image1:'',
            image2:'',
            body: '',
        }
    }

    componentWillMount() {
        const {params} = this.props.match;

        this.props.fetchArticle(params.id)
            .then((res) => {
                console.log('res=>', res);
                this.setState({
                    article: res,
                    title: res.title,
                    subtitle: res.subtitle,
                    SURtitle: res.SURtitle,
                    author: res.author,
                    splash: res.splash,
                    image1: res.image1,
                    image2: res.image2,
                    body: res.body,
                    isLoading: true,
                });
            })
    }

    render() {
        const { loading,  error } = this.props;

        if (loading || !this.state.isLoading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Server Error... {error.message}</div>;
        }
        const { title, subtitle, author, body, splash, image1, image2} = this.state.article;


        return(
            <div className="article">
                <HeroCuradiv />
                <Section className="is-paddingless">
                    <Container className="splash is-full-width">
                        <Media className="is-full-width">
                            <Media.Item className="is-fluid">
                                {getImageArticle(splash, 'slot.png')}
                            </Media.Item>
                        </Media>
                    </Container>
                </Section>
                <Section >
                    <Container>
                        <Content>
                            <h1 className="article__title">{title}</h1>
                            <h2>{subtitle}</h2>
                            <h3>{author}</h3>

                            <ArticleBody body={body} image1={image1} image2={image2}/>

                        </Content>
                    </Container>
                </Section>
            </div>
        )
    }

}

const mapStateToProps = state =>
    ({
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