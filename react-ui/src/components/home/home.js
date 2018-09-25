import React, { Component } from 'react';

import {connect} from "react-redux";
import { articleActions } from '../../stores/_actions/article.action';
import { Hero, Container,Content, Heading, Section, Level, Box, Media, Image } from 'react-bulma-components';

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
                    <Hero.Body>
                       <Heading>Curadivo</Heading>
                        <Heading subtitle size={3}>
                            Curated Knowledge. Unlimited Potential
                        </Heading>
                    </Hero.Body>
                </Hero>

                <Section>
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