import React, { Component } from 'react';
import axios from 'axios';

import { Hero, Container,Content, Heading, Section, Level, Box, Media, Image, Card } from 'react-bulma-components';

//style
import './article.css';

class Article extends Component {
    constructor (props) {
        super(props);
        //this.getArticle = this.getArticle.bind(this);
        this.state = {
            article: {}
        }

    }

    getArticle = (id) => {
        return axios
            .get(`/api/articles/${id}`)
            .then(response => {
                return Promise.resolve(response.data.article)
            })
            .cache(error => {
                return Promise.reject(error)
            })
    };

    componentDidMount() {
        const { match } = this.props;
        const {id} = match.params;

        if (id) {
            axios.get(`/api/articles/${id}`)
                .then(res => {
                    const article = res.data;
                    console.log('res=>', res);
                    this.setState({ article });
                })
                .catch(err => {
                    console.log('err => ', err);
                })
            // this.getArticle(id)
            //     .then(response => {
            //         console.log('!response =>', response)
            //     })
            //     .catch(error => {
            //         console.log('!!error=>', error);
            //     })
        }
    }
    render() {
        console.log('render => ', this.state.article);
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
                            <Media.Item>
                                <Image
                                 src='https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Ribbons-and-Banners-PNG/Banner_Green_Deco_Clip_Art_PNG_Image.png?m=1507172115'/>
                            </Media.Item>
                        </Media>
                    </Container>
                </Section>
                {this.state.article._id}
                {this.state.article.title}
                {this.state.article.subtitle}
                {this.state.article.body}
                {this.state.article.splash}
            </div>
        )
    }

}

export default Article;