import React, { Component } from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import  ReactS3Uploader from 'react-s3-uploader';

import {
    fetchPodcast, editArticle,
    restore_newPodcast,
    restore_editPodcast, restore_editArticle, restore_newArticle,
} from "../../stores/_actions/article";

//components
import { Button,   Columns} from 'react-bulma-components';
import { Field, Label, Control, Input, Textarea } from 'react-bulma-components/lib/components/form';

//style
import './form.css';





class FormPodcast extends Component {
    constructor (props) {
        super(props);
        const isEdit = this.props.id.length > 0;
        this.form = React.createRef();

        this.state = {
            author: '',
            splash:'',
            splash_f:'',
            archived: false,
            isEdit: isEdit
        };
    }

    componentDidMount() {
        const {id, article} = this.props;
        if (id)
            if (!article) {
                console.log('Component(Article) => componentWillMount => fetchArticle => id=', id);
                this.props.fetchPodcast(id)
                    .then((res) => {
                        this.setState({
                            author: res.author,
                            splash: res.splash,
                            archived: false
                        });
                        console.log('>>> res=>', this.state);
                    });
            } else {
                this.setState({
                    author: article.author,
                    splash: article.splash,
                    archived: false
                });

            }

    }




    onNew (formData) {
        if (formData) {
            this.props.restore_newPodcast(formData)
                .then( () => {
                    if (!this.props.error) {
                        window.location.href = '/admin'
                    }
                })
        }

    }

    onEdit (formData) {
        if (formData) {
            this.props.restore_editPodcast(formData)
                .then( () => {
                    if (!this.props.error) {
                        window.location.href = '/admin'
                    }
                });
        }

    }

    onChange = (e) => {
        e.preventDefault();

        switch (e.target.name) {
            case 'splash_f':
                if (e.target.files[0]) {
                    this.setState({
                        splash_f: e.target.files[0],
                        splash: e.target.files[0].name,
                    });
                } else {
                    this.setState({
                        splash_f: {},
                        splash: '',
                    });
                }
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { author, splash, splash_f} = this.state;
        const {isEdit} = this.state;

        let formData = new FormData();

        formData.append('_id', this.props.id);
        formData.append('author', author);
        formData.append('splash', splash);
        formData.append('splash_f', splash_f);
        formData.append('archived', false);

        if (!isEdit) {
            return this.onNew(formData)
        } else {
            return this.onEdit(formData)
        }
    };

    render() {
        const { author, splash } = this.state;
        const { loading, error } = this.props;
        if (loading ) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Server Error... {error.message}</div>;
        }

        return (
            <div className="form__ArticleEdit">
                <form className="form__ArticleEdit" onSubmit={this.onSubmit}>
                    <Field>
                        <Control>
                            <Input
                                type="text"
                                name="author"
                                value={author}
                                onChange={this.onChange}
                                required={true}
                                placeholder="Author"
                            />
                        </Control>
                    </Field>

                    <Field>
                        <Label>Splash image</Label>
                        <Control>

                            <input
                                type="file"
                                name="splash_f"
                                accept=".png"
                                onChange={this.onChange}
                            />
                            <Label>{splash}</Label>
                        </Control>
                    </Field>



                    {/*<ReactS3Uploader*/}
                        {/*accept="image/*"*/}
                        {/*uploadRequestHeaders={{*/}
                            {/*'x-amz-acl': 'public-read'*/}
                        {/*}}*/}
                        {/*contentDisposition="auto"*/}
                    {/*/>*/}



                    <div className="buttons is-right">
                        <Button className="is-danger" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
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
        fetchPodcast: bindActionCreators(fetchPodcast, dispatch),
        editArticle: bindActionCreators(editArticle, dispatch),

        restore_editPodcast: bindActionCreators(restore_editPodcast, dispatch),
        restore_newPodcast: bindActionCreators(restore_newPodcast, dispatch)
    }
};

export default connect(mapStateToProps, mapActionToProps)(FormPodcast);

