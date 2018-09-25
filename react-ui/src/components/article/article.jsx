import React, { Component } from 'react';
import axios from 'axios';

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
            <div>
                {this.state.article._id}
                {this.state.article.title}
                {this.state.article.subtitle}
                {this.state.article.body}
            </div>
        )
    }

}

export default Article;