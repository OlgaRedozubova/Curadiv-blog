import React, { Component } from 'react';

import {connect} from "react-redux";
import { articleActions } from '../../stores/_actions/article.action';
import { Hero, Container,Content, Heading, Section, Level, Box, Media, Image, Card } from 'react-bulma-components';

//#components
import BoxCard from '../box-card/box-card';

class Home extends Component {

    componentDidMount() {
        //this.props.dispatch(articleActions.getAll());
        this.props.dispatch(articleActions.fetchArticles());
        console.log('componentDidMount => this =>', this);
    }
    render() {
        const {  error, loading,articles } = this.props;
        console.log('render => this =>', error, loading, articles);
        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div>

                <Hero color="info">
                    <Container className="is-fluid">
                    <Hero.Body>
                       <Heading>Curadivo</Heading>
                        <Heading subtitle size={3}>
                            Curated Knowledge. Unlimited Potential
                        </Heading>
                    </Hero.Body>
                    </Container>
                </Hero>

                <Section className="is-paddingless">
                    <Container className="is-fluid ">
                        <Box>
                            <Media>

                                <Media.Item >
                                    <Content>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis
                                        </p>
                                    </Content>
                                </Media.Item>

                                <Media.Item position="right" size={5}>
                                    <Image
                                        src ={require('../../assets/images/01.png')}/>
                                </Media.Item>
                            </Media>
                        </Box>
                    </Container>
                </Section>
                <Section className="is-paddingless">
                    <Container className="is-fluid is-clearfix">
                        {!loading && articles &&

                            articles.map((article, index) =>
                                <BoxCard article = {article}/>
                            )
                        }

                        {/*<Box>*/}
                            {/*<Card>*/}
                                {/*<Card.Image size="4by3"  src ={require('../../assets/images/01.png')}/>*/}
                                {/*<Card.Content>*/}
                                    {/*<Content>*/}
                                        {/*<p>*/}
                                            {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis*/}
                                        {/*</p>*/}
                                    {/*</Content>*/}
                                {/*</Card.Content>*/}
                            {/*</Card>*/}
                        {/*</Box>*/}
                        {/*<Box>*/}
                            {/*<Card>*/}
                                {/*<Card.Image size="4by3"  src ={require('../../assets/images/01.png')}/>*/}
                                {/*<Card.Content>*/}
                                    {/*<Content>*/}
                                        {/*<p>*/}
                                            {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis*/}
                                        {/*</p>*/}
                                    {/*</Content>*/}
                                {/*</Card.Content>*/}
                            {/*</Card>*/}
                        {/*</Box>*/}
                        {/*<Box>*/}
                            {/*<Card>*/}
                                {/*<Card.Image size="4by3"  src ={require('../../assets/images/01.png')}/>*/}
                                {/*<Card.Content>*/}
                                    {/*<Content>*/}
                                        {/*<p>*/}
                                            {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis*/}
                                        {/*</p>*/}
                                    {/*</Content>*/}
                                {/*</Card.Content>*/}
                            {/*</Card>*/}
                        {/*</Box>*/}
                    </Container>

                </Section>
                <ul>
                    {!loading && articles &&

                    articles.map((article, index) =>
                        <li key={article.id}>
                            {article.title + ' ' + article.subtitle}
                            {/*{*/}
                                {/*article.deleting ? <em> - Deleting...</em>*/}
                                    {/*: article.deleteError ? <span className="text-danger"> - ERROR: {article.deleteError}</span>*/}
                                    {/*: <span> - <a onClick={this.handleDeleteUser(article.id)}>Delete</a></span>*/}
                            {/*}*/}
                        </li>
                    )
                    }
                </ul>
                }

            </div>
        )
    }
};

const mapStateToProps = state =>
    ({
        articles: state.articles.items,
        loading: state.articles.loading,
        error: state.articles.error,
    });

export default connect(mapStateToProps)(Home);