import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import MarkDown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';

import { Hero, Container, Heading, Section, Media, Image} from 'react-bulma-components';
import Content from 'react-bulma-components/lib/components/content';

import {fetchArticle} from '../../stores/_actions/article';

//style
import './article.css';
import { getImageArticle } from "../image/image";


class Article extends Component {
    constructor (props) {
        super (props);
        this.state = {
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

    componentDidMount() {
        const {params} = this.props.match;

        this.props.fetchArticle(params.id)
            .then((res) => {
                console.log('res=>', res);
                this.setState({
                    title: res.title,
                    subtitle: res.subtitle,
                    SURtitle: res.SURtitle,
                    author: res.author,
                    splash: res.splash,
                    image1: res.image1,
                    image2: res.image2,
                    body: res.body,
                });
            })
        // if (!this.props.article){
        //     console.log('Component(Article) => componentWillMount => fetchArticle => id=', params.id);
        //     this.props.fetchArticle(params.id);
        // }
    }

    render() {
        const { loading, article, error } = this.props;

        if (loading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Server Error... {error.message}</div>;
        }
        const { title, subtitle, SURtitle, author, body, splash, image1, image2, slot} = this.state;

        // const parseHtml = htmlParser({
        //     isValidNode: node => node.type === 'image',
        //     processingInstruction: [{
        //         shouldProcessNode: function (node) {
        //             return node.parent && node.parent.name && node.parent.name === 'h1';
        //         }
        //     }]
        // });

        return(
            <div className="article">
                <Hero color="info">
                    <Container>
                        <Hero.Body>
                            <Heading>Curadiv</Heading>
                        </Hero.Body>
                    </Container>
                </Hero>
                <Section className="is-paddingless">
                    <Container className="splash">
                        <Media>
                            <Media.Item className="is-fluid">
                                {getImageArticle(splash, 'slot.png')}
                            </Media.Item>
                        </Media>
                    </Container>
                </Section>
                <Section >
                    <Container>
                        <Content>
                            <h1 className="title">{title}</h1>
                            <h2>{subtitle}</h2>
                            <h3>{author}</h3>
                            <MarkDown
                                escapeHtml={false}
                            >{body}</MarkDown>
                            {/*<MarkDown*/}
                                {/*escapeHtml={false}*/}
                                {/*astPlugins={[parseHtml]}*/}
                            {/*>{body}</MarkDown>*/}
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