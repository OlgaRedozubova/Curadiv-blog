import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { selectArticle, fetchArticles } from '../../stores/_actions/article';
import { Hero, Container, Heading, Section, Columns, Tile, Content, Box, Level, Media, Image } from 'react-bulma-components';


//#components
import BoxArticle from  '../box-article/box-article';
import CardArticle from  '../box-article/card-article';
import BigBoxArticle from "../box-article/big-box-article";
import Podcast from "./podcast";

//style
import './home.css';


class Home extends Component {

    componentDidMount() {
        this.props.fetchArticles();
    }

    slotToSection = (articles = {}, arrSlot = []) => {
        const arr = [];
        articles.map((item,index) => {
            for (let i = 0; i < arrSlot.length; i++) {
                if (item.slot === arrSlot[i]){
                    arr.push({
                        ...item,
                        index:index
                    });
                }
            }
        });
        return arr;
    };

    render() {
        const {  error, loading,articles, podcast } = this.props;
        if (loading || !articles) {
            return <div>Loading...</div>;
        }

        console.log('render => this =>', error, loading, articles);
        const articlesSection1 = this.slotToSection(articles, [1]);
        const articlesSection2 = this.slotToSection(articles, [2, 3, 4]);
        const articlesSection3_1 = this.slotToSection(articles, [5, 7, 9]);
        const articlesSection3_2 = this.slotToSection(articles, [6, 8, 10]);

        console.log('articlesSection1 => ', articlesSection1)

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        return (
            <div>

                <Hero color="info">
                    <Container >
                    <Hero.Body>
                       <Heading>Curadiv</Heading>
                        <Heading subtitle size={3}>
                            Curated Knowledge. Unlimited Potential
                        </Heading>
                    </Hero.Body>
                    </Container>
                </Hero>
                <Section className="is-paddingless section-one">
                    <Container className="cards">
                        {articlesSection1 && articlesSection1.length > 0 &&
                        <BigBoxArticle article = {articlesSection1[0]} onClick={this.props.selectArticle}/>
                        }
                    </Container>
                    <Container className="cards CardArticle">
                        <Columns breakpoint="tablet" >
                            {articlesSection2 &&
                                articlesSection2.map((article) =>
                                <Columns.Column>
                                    <CardArticle article = {article} onClick={this.props.selectArticle}/>
                                </Columns.Column>
                                )
                            }
                        </Columns>
                    </Container>
                </Section>


                <Section className="is-paddingless">
                    <Container className="Podcast has-background-info">
                        {podcast &&
                            <Podcast podcast={podcast[0]}/>
                        }
                    </Container>
                </Section>



                {articlesSection3_1 &&
                    <Section className="is-paddingless section-two">
                        <Container className="cards BoxArticle is-clearfix">

                            <Columns className="is-paddingless is-desktop">
                                <Columns.Column>
                                    {articlesSection3_1 &&
                                        articlesSection3_1.map((article) =>
                                            <BoxArticle key={article._id} article = {article} onClick={this.props.selectArticle}/>
                                        )
                                    }
                                </Columns.Column>

                                <Columns.Column>
                                    {articlesSection3_2 &&
                                        articlesSection3_2.map((article) =>
                                            <BoxArticle key={article._id} article = {article} onClick={this.props.selectArticle}/>
                                        )
                                    }
                                </Columns.Column>
                            </Columns>
                        </Container>
                    </Section>
                }

            </div>
        )
    }
};

const mapStateToProps = state =>
    ({
        articles: state.articles.items,
        podcast: state.articles.podcast,
        loading: state.articles.loading,
        error: state.articles.error,
    });

const mapActionToProps = (dispatch) => {
    return {
        selectArticle: bindActionCreators(selectArticle, dispatch),
        fetchArticles: bindActionCreators(fetchArticles, dispatch)
    }
};

export default connect(mapStateToProps, mapActionToProps)(Home);