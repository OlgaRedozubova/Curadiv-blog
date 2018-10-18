import React, { Component } from 'react';

import {connect} from "react-redux";
import {fetchArticles, addSelectArticles, delSelectArticles, clearSelectArticles, selectArticle} from '../../stores/_actions/article';

import { Container, Table, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";


class Admin extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            articles: [],
            articleList: [],
            isChecked: false,
            idArticle: ''
        }
    }

    componentWillMount() {
        this.props.clearSelectArticles();
        this.props.fetchArticles()
            .then(res => {
                res.map(item => Object.assign(item, {isChecked: false}));
                this.setState({articles: [...res]})
            });
    }
    onClick = (e, article) => {
        console.log('onclick => ', article, e);
    };

    onChange(value, article){
        if (value) {
            this.props.addSelectArticles(article);
        } else {
            this.props.delSelectArticles(article._id);
        }
    }

    editArticle = (e) => {
      const {selectArticles} = this.props;
      console.log('>>> editArticle >>> articleList =>', selectArticles, selectArticles.length);


      if(selectArticles && selectArticles.length===1) {
          this.props.selectArticle(selectArticles[0]);
      }

      if (!selectArticles || !selectArticles.length || selectArticles.length < 1 ) {
            e.preventDefault();
      } else {
          if (selectArticles.length > 1 ) {
              e.preventDefault();
          }
      }

    };

    onClickDel = (e) => {
        const { articleList } = this.state;
        console.log('articleList.length=> ', articleList.length);
        if (articleList.length < 1 ) {
            e.preventDefault();
        } else {
            //this.props.dispatch(articleActions.onRemoveArticle(articleList));
            //this.props.onRemoveArticle(articleList)
        }
    };

    render() {
        const { error, loading, articles } = this.props;

        if (error)   { return <div>Error! {error.message}</div> }
        if (loading || !articles ) { return <div>Loading...</div> }


        const idArticle = (this.props.selectArticles.length===1) ? this.props.selectArticles[0]._id : '';
        return (
            <div >
                <h1>Admin page</h1>
                <Container>
                    <Link to={`/article-edit/${idArticle}`} onClick={this.editArticle}>
                        <Button>Edit</Button>
                    </Link>
                    <Button>Arh</Button>
                    <Button onClick={this.onClickDel}>Del</Button>
                    <Link to={`/article-edit`}>
                        <Button>Add</Button>
                    </Link>
                </Container>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th className="is-2">Check</th>
                                <th className="is_2">Slot</th>
                                <th className="is-5">Title</th>
                            </tr>
                        </thead>
                        <tbody>
                        { articles && articles.length > 0 &&
                            articles.map((article, index) =>
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" name="check"
                                           onChange={(e)=>this.onChange(e.target.checked, article)}
                                    />
                                </td>
                                <td>
                                    {article.slot}
                                </td>
                                <td className="is-fullwidth">
                                    {article.title}
                                </td>
                            </tr>

                        )
                        }
                        </tbody>
                    </Table>

                </Container>
            </div>
        )
    }
};

const mapStateToProps = state =>
    ({
        articles: state.articles.items,
        loading: state.articles.loading,
        error: state.articles.error,
        selectArticles: state.selectArticles
    });

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: bindActionCreators(fetchArticles, dispatch),
        addSelectArticles: bindActionCreators(addSelectArticles, dispatch),
        delSelectArticles: bindActionCreators(delSelectArticles, dispatch),
        clearSelectArticles: bindActionCreators(clearSelectArticles, dispatch),
        selectArticle: bindActionCreators(selectArticle, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);