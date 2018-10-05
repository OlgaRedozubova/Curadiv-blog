import React, { Component } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

import {
    fetchAdminArticles, addSelectArticles, delSelectArticles, clearSelectArticles, clearArticle,
    editArticle,
    editPodcast,
    newArticle,
    addArchive,
    restoreArchive,
    deleteArticles
    } from '../../stores/_actions/article';

import { Container, Table, Button, Section, Level, Heading } from 'react-bulma-components/lib';
import {Control, Field, Input} from "react-bulma-components/lib/components/form";
import Icon from 'react-bulma-components/lib/components/icon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faArchive, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import HeroCuradiv from '../hero-curadiv/hero-curadiv';

//style
import './admin.css';




class Admin extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            articles: [],
            archive: [],
            podcast: [],
            archivePodcast: [],

            articleList: [],
            idArticle: '',

            selectArticleArchive: {},
            selectPodcast: {},
            restoreSlot: '0'
        }
    }

    componentWillMount() {
        this.props.clearSelectArticles();
        this.props.clearArticle();
        this.props.fetchAdminArticles()
            .then(res => {
                this.setState({
                    articles: [...res.articles],
                    archive: [...res.archive],
                    podcast: [...res.podcast],
                    archivePodcast: [...res.archivePodcast]
                })
            });
    }
    onClick = (e, article) => {
        console.log('onclick => ', article, e);
    };

    onChange(value, article, isPodcast = false){
        if (value) {
            this.props.addSelectArticles({...article, isPodcast: isPodcast});
        } else {
            this.props.delSelectArticles(article._id);
        }
    };

    onSelectArchive(value, article, isPodcast = false) {
        this.setState({selectArticleArchive: {...article, isPodcast: isPodcast},
            restoreSlot: article.slot});
    }


    editArticle = (e) => {
      const {selectArticles} = this.props;
      if(selectArticles && selectArticles.length===1) {
          this.props.editArticle(selectArticles[0]);
      }
      if ((!selectArticles || !selectArticles.length || selectArticles.length < 1) && (!this.state.selectPodcast) ) {
            e.preventDefault();
            alert('Select article!!!')
      } else {
          if (selectArticles.length > 1 ) {
              e.preventDefault();
              alert('Select one article!!!')
          }
      }
    };


    editPodcast = (e) => {
        const {podcast} = this.state;
        console.log('podcast=?', podcast)
        if(podcast) {
            this.props.editPodcast(podcast[0]);
        }
        if ((!podcast || !podcast.length || podcast.length < 1) ) {
            e.preventDefault();
            alert('Not podcast!!!')
        };
    };

    onDelete = () => {
        const {selectArticles} = this.props;

        if (!selectArticles || !selectArticles.length || selectArticles.length < 1 ) {
            alert('Select article!!!')
        } else {
            this.props.deleteArticles(selectArticles)
                .then(res => {
                    this.setState({
                        articles: [...res.articles],
                        archive: [...res.archive],
                        podcast: [...res.podcast],
                        archivePodcast: [...res.archivePodcast]
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
                        archive: [...res.archive],
                        podcast: [...res.podcast],
                        archivePodcast: [...res.archivePodcast]
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
                    this.setState({
                        articles: [...res.articles],
                        archive: [...res.archive],
                        podcast: [...res.podcast],
                        archivePodcast: [...res.archivePodcast]
                    });
                    this.props.clearSelectArticles();
            });
        }
    };

    onRestore = () => {
        //addArchive
        const { restoreSlot, selectArticleArchive } = this.state;
        console.log('3 onSelectArchive => ',restoreSlot, selectArticleArchive);

        if (!selectArticleArchive) {
            alert('Select article!!!');
            return;
        }

        if (!selectArticleArchive.isPodcast) {
            if (!restoreSlot) {
                alert('Please input RestoreSlot');
                return;
            } else {
                selectArticleArchive.slot = restoreSlot;
            }
        }

        // let list = [];
        // list.push(selectArticleArchive);
        this.props.restoreArchive(selectArticleArchive)
            .then(res => {
                this.setState({
                    articles: [...res.articles],
                    archive: [...res.archive],
                    podcast: [...res.podcast],
                    archivePodcast: [...res.archivePodcast]
                });
               // this.props.clearSelectArticles();
            });

    };

    onChangeSlot = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
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
        const { error, loading, articles, archive, podcast, archivePodcast } = this.props;
        const { restoreSlot } = this.state;
        if (error)   { return <div>Error! {error.message}</div> }
        if (loading || !articles ) { return <div>Loading...</div> }


        const idArticle = (this.props.selectArticles.length===1) ? this.props.selectArticles[0]._id : '';
        return (
            <div className="admin">
                <HeroCuradiv />
                <Section>
                    <Container className="admin__container notification is-flex">
                        <h1 className="title">Admin page</h1>
                    </Container>
                    <Container className="notification">
                        <Table>
                            <thead>
                            <tr>
                                <th className="is-narrow"></th>
                                <th className="is-narrow">Slot</th>
                                <th className="is-4">
                                    <div className="is-right">

                                        <Link to={`/admin-article/${idArticle}`} onClick={this.editArticle}>
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


                                        <Link to={`/admin-article`} onClick={()=>this.props.newArticle()}>
                                            <Button className="is-text">
                                                <Icon className="icon icon is-medium fa-lg" color="info">
                                                    <FontAwesomeIcon icon={faPlusCircle} />
                                                </Icon>
                                            </Button>
                                        </Link>
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
                                               onChange={(e)=>this.onChange(e.target.checked, article, false)}
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
                    <Container className="notification">
                        <Table>
                            <thead>
                            <tr>
                                <th className="is-narrow">Podcast</th>
                                <th className="is-4"></th>
                                <th className="is-narrow"><div className="is-right">
                                    <Link to={`/admin-podcast`} onClick={()=>this.props.newArticle()}>
                                        <Button className="is-text">
                                            <Icon className="icon icon is-medium fa-lg" color="info">
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                            </Icon>
                                        </Button>
                                    </Link>
                                </div></th>
                            </tr>
                            </thead>
                            <tbody>

                            { podcast && podcast.length > 0 &&
                            podcast.map((podcast, index) =>
                                <tr key={index}>
                                    <td></td>
                                    <td>
                                        {podcast.author}
                                    </td>
                                    <td>
                                        <Link to={`/admin-podcast/${podcast._id}`} onClick={this.editPodcast}>
                                            <Button className="is-text">
                                                <Icon className="icon icon is-medium fa-lg">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Icon>
                                            </Button>
                                        </Link>
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
                                <th className="is-narrow">Slot</th>
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
                                               onChange={(e)=>this.onSelectArchive(e.target.checked, article, false)}
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
                            { archivePodcast && archivePodcast.length > 0 &&
                            archivePodcast.map((podcast, index) =>
                                <tr key={index}>
                                    <td>
                                        <input type="radio" name="radio"
                                               onChange={(e)=>this.onSelectArchive(e.target.checked, podcast, true)}
                                        />
                                    </td>
                                    <td>
                                        Podcast
                                    </td>
                                    <td>
                                        {podcast.author}
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
        podcast: state.articles.podcast,
        archivePodcast: state.articles.archivePodcast,
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
        editPodcast:  bindActionCreators(editPodcast, dispatch),
        newArticle:  bindActionCreators(newArticle, dispatch),

        //--------
        addArchive: bindActionCreators(addArchive, dispatch),
        restoreArchive: bindActionCreators(restoreArchive, dispatch),
        deleteArticles: bindActionCreators(deleteArticles, dispatch),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);