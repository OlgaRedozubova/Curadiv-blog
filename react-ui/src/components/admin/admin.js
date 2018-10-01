import React, { Component } from 'react';

import {connect} from "react-redux";
import {fetchAdminArticles, addSelectArticles, delSelectArticles, clearSelectArticles, clearArticle,
    //selectArticle,
    editArticle,
    newArticle,
    addArchive,
    restoreArchive,
    deleteArticles
    } from '../../stores/_actions/article';

import { Container, Table, Button, Section, Level, Box, Heading } from 'react-bulma-components';
import Icon from 'react-bulma-components/lib/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faArchive, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'


import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";

//style
import './admin.css';
import {Control, Field, Input, Label} from "react-bulma-components/lib/components/form";



class Admin extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            articles: [],
            archive: [],
            articleList: [],
            isChecked: false,
            idArticle: '',
            selectedArticles: [],
            selectArticleArchive: {},
            restoreSlot: '0'
        }
    }

    componentWillMount() {
        this.props.clearSelectArticles();
        this.props.clearArticle();
        this.props.fetchAdminArticles()
            .then(res => {
                // res.articles.map(item => Object.assign(item, {isChecked: false}));
                this.setState({
                    articles: [...res.articles],
                    archive: [...res.archive]
                })
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
    onSelectArchive(value, article) {
        console.log('1 onSelectArchive => ', value, article);
        this.setState({selectArticleArchive: {...article},
            restoreSlot: article.slot});
        console.log('2 onSelectArchive => ', value, this.state.selectArticleArchive);
    }

    editArticle = (e) => {
      const {selectArticles} = this.props;
      console.log('>>> editArticle >>> articleList =>', selectArticles, selectArticles.length);


      if(selectArticles && selectArticles.length===1) {
          //this.props.selectArticle(selectArticles[0]);
          this.props.editArticle(selectArticles[0]);
      }

      if (!selectArticles || !selectArticles.length || selectArticles.length < 1 ) {
            e.preventDefault();
            alert('Select article!!!')
      } else {
          if (selectArticles.length > 1 ) {
              e.preventDefault();
              alert('Select one article!!!')
          }
      }

    };
    onDelete = () => {
        const {selectArticles} = this.props;

        if (!selectArticles || !selectArticles.length || selectArticles.length < 1 ) {
            alert('Select article!!!')
        } else {
            this.props.deleteArticles(selectArticles)
                .then(res => {
                    // res.articles.map(item => Object.assign(item, {isChecked: false}));
                    this.setState({
                        articles: [...res.articles],
                        archive: [...res.archive]
                    });
                    this.props.clearSelectArticles();
                });
        }
    };
    onDeleteArchive = () => {
        const { selectArticleArchive } = this.state;

        if (!selectArticleArchive) {
            alert('Select article!!!')
        } else {
            let list = [];
            list.push(selectArticleArchive);
            this.props.deleteArticles(list)
                .then(res => {
                    this.setState({
                        articles: [...res.articles],
                        archive: [...res.archive]
                    });
                    // this.props.clearSelectArticles();
                });
        }
    };

    onArchive = () => {
        //addArchive
        const {selectArticles} = this.props;

        if (!selectArticles || !selectArticles.length || selectArticles.length < 1 ) {
            alert('Select article!!!')
        } else {
            this.props.addArchive(selectArticles)
                .then(res => {
                // res.articles.map(item => Object.assign(item, {isChecked: false}));
                    this.setState({
                        articles: [...res.articles],
                        archive: [...res.archive]
                    });
                    this.props.clearSelectArticles();
            });
        }
    };

    onRestore = () => {
        //addArchive
        const { restoreSlot, selectArticleArchive } = this.state;
        console.log('3 onSelectArchive => ',restoreSlot, selectArticleArchive);
        if (!restoreSlot) {
            alert('Please input RestoreSlot');
        }


        if (!selectArticleArchive) {
            alert('Select article!!!')
        } else {
            this.props.restoreArchive(selectArticleArchive)
                .then(res => {
                    this.setState({
                        articles: [...res.articles],
                        archive: [...res.archive]
                    });
                   // this.props.clearSelectArticles();
                });
        }
    };
    onChangeSlot = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

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
        const { error, loading, articles, archive } = this.props;
        const { restoreSlot } = this.state;
        if (error)   { return <div>Error! {error.message}</div> }
        if (loading || !articles ) { return <div>Loading...</div> }


        const idArticle = (this.props.selectArticles.length===1) ? this.props.selectArticles[0]._id : '';
        return (
            <div >
                <h1>Admin page</h1>
                <Section>
                    <Container className="notification">
                        <Table>
                            <thead>
                            <tr>
                                <th className="is-narrow"></th>
                                <th className="is-narrow">Slot</th>
                                <th className="is-4">
                                    <div className="is-right">

                                        <Link to={`/article-edit/${idArticle}`} onClick={this.editArticle}>
                                            <Button className="is-text">
                                                <Icon className="icon icon is-medium fa-lg">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Icon>
                                            </Button>
                                        </Link>

                                        <Button className="is-text" onClick={this.onArchive}>
                                            <Icon className="icon icon is-medium fa-lg is-light" color="success">
                                                <FontAwesomeIcon icon={faArchive} />
                                            </Icon>
                                        </Button>

                                        <Button className="is-text" onClick={this.onDelete}>
                                            <Icon className="icon icon is-medium fa-lg has-text-danger">
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </Icon>
                                        </Button>


                                        <Link to={`/article-edit`} onClick={()=>this.props.newArticle()}>
                                            <Button className="is-text">
                                                <Icon className="icon icon is-medium fa-lg" color="info">
                                                    <FontAwesomeIcon icon={faPlusCircle} />
                                                </Icon>
                                            </Button>
                                        </Link>


                                        {/*<Button onClick={this.onClickDel}>Del</Button>*/}
                                    </div>
                                </th>
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
                                    <td>
                                        {article.title}
                                    </td>
                                </tr>

                            )
                            }
                            </tbody>
                        </Table>
                    </Container>
                </Section>
                <Section className="archive">
                    <Container className="notification">
                        <Table>
                            <thead>
                            <tr>
                                <th className="is-narrow"></th>

                                <th className="is-4">

                                        <Level renderAs="nav">

                                                <Level.Item className="has-text-centered">
                                                    <Heading size={5} subtitle>
                                                        <strong>Archive</strong>
                                                        <Icon className="icon icon is-medium fa-lg is-light" color="success">
                                                            <FontAwesomeIcon icon={faArchive} />
                                                        </Icon>
                                                    </Heading>
                                                </Level.Item>
                                                <Level.Item>

                                                </Level.Item>


                                            <Level.Side align="right">

                                                <Level.Item>
                                                    <Field kind="addons">
                                                        <Control>
                                                            <Button renderAs="button" onClick={this.onRestore}>Restore</Button>
                                                        </Control>
                                                        <Control>
                                                            <Input
                                                                onChange={this.onChangeSlot}
                                                                name="restoreSlot"
                                                                type="number"
                                                                min="0"
                                                                max="12"
                                                                required={true}
                                                                value={restoreSlot}
                                                            />
                                                        </Control>



                                                        <Button renderAs="a" className="is-text" onClick={this.onDeleteArchive}>
                                                            <Icon className="icon icon is-medium fa-lg has-text-danger">
                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                            </Icon>
                                                        </Button>
                                                    </Field>
                                                </Level.Item>
                                            </Level.Side>
                                        </Level>

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            { archive && archive.length > 0 &&
                            archive.map((article, index) =>
                                <tr key={index}>
                                    <td>
                                        <input type="radio" name="radio"
                                               onChange={(e)=>this.onSelectArchive(e.target.checked, article)}
                                        />
                                    </td>

                                    <td>
                                        {article.title}
                                    </td>
                                </tr>

                            )
                            }
                            </tbody>
                        </Table>
                    </Container>
                </Section>

            </div>
        )
    }
};

const mapStateToProps = state =>
    ({
        articles: state.articles.items,
        archive: state.articles.archive,
        loading: state.articles.loading,
        error: state.articles.error,
        selectArticles: state.selectArticles

    });

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAdminArticles: bindActionCreators(fetchAdminArticles, dispatch),
        addSelectArticles: bindActionCreators(addSelectArticles, dispatch),
        delSelectArticles: bindActionCreators(delSelectArticles, dispatch),
        clearSelectArticles: bindActionCreators(clearSelectArticles, dispatch),
        clearArticle: bindActionCreators(clearArticle, dispatch),
        //selectArticle: bindActionCreators(selectArticle, dispatch),

        editArticle:  bindActionCreators(editArticle, dispatch),
        newArticle:  bindActionCreators(newArticle, dispatch),

        //--------
        addArchive: bindActionCreators(addArchive, dispatch),
        restoreArchive: bindActionCreators(restoreArchive, dispatch),
        deleteArticles: bindActionCreators(deleteArticles, dispatch),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);