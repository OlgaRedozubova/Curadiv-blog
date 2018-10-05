import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {fetchArticle, editArticle,
    restore_newArticle, restore_editArticle} from "../../stores/_actions/article";

//components
import { Button,   Columns} from 'react-bulma-components';

import FieldFile from './field-file';
import FieldText from './field-text';
import FieldSlot from './field-slot';

//style
import './form.css';
import FieldMessage from "./field-message";


class Form extends Component {
    constructor (props) {
        super(props);
        const isEdit = this.props.id.length > 0;

        this.form = React.createRef();
        this.state = {
            isEdit: isEdit,
            article: {},
        };
    }


    componentDidMount() {
        const {id, article} = this.props;
        if (id) {
            if (!article) {
                this.props.fetchArticle(id)
                    .then((res) => {
                        this.setState({
                            article: {
                                ...res,
                                splash_f: {},
                                image1_f: {},
                                image2_f: {}
                            },
                        });
                    });
            } else {
                this.setState({
                    article: {
                        ...article,
                        splash_f: {},
                        image1_f: {},
                        image2_f: {}
                    },
                });

            }
        }
    }


    onNewArticle (formData) {
        if (formData) {
            this.props.restore_newArticle(formData)
                .then( () => {
                    if (!this.props.error) {
                        window.location.href = '/admin'
                    }
                })
        }
    }

    onEditArticle (formData) {
        if (formData) {
            this.props.restore_editArticle(formData)
                .then( () => {
                    if (!this.props.error) {
                        window.location.href = '/admin'
                    }
                });
        }

    }

    onChange = (e) => {
        e.preventDefault();
        const article = {...this.state.article};
        switch (e.target.name) {
            case 'splash_f':
                if (e.target.files[0]) {
                    article.splash_f = e.target.files[0];
                    article.splash = e.target.files[0].name;
                } else {
                    article.splash_f = {};
                    article.splash = '';
                }
                break;
            case 'image1_f':
                if (e.target.files[0]) {
                    article.image1_f = e.target.files[0];
                    article.image1 = e.target.files[0].name;
                } else {
                    article.image1_f = {};
                    article.image1 = '';
                }
                break;
            case 'image2_f':
                if (e.target.files[0]) {
                    article.image2_f = e.target.files[0];
                    article.image2 = e.target.files[0].name;
                } else {
                    article.image2_f = {};
                    article.image2 = '';
                }
                break;
            default:
                article[e.target.name] = e.target.value;
        }
        this.setState({article: article});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { isEdit, article } = this.state;
        const { _id, title, subtitle, SURtitle, author, slot, splash, splash_f, image1, image1_f, image2, image2_f, body} = article;

        let formData = new FormData();

        formData.append('_id', _id);
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('SURtitle', SURtitle);
        formData.append('author', author);
        formData.append('slot', slot);
        formData.append('splash', splash);
        formData.append('splash_f', splash_f);
        formData.append('image1_f', image1_f);
        formData.append('image1', image1);
        formData.append('image2_f', image2_f);
        formData.append('image2', image2);
        formData.append('body', body);


        if (!isEdit) {
            return this.onNewArticle(formData)
        } else {
            return this.onEditArticle(formData)
        }
    };

    render() {
        const { loading, error } = this.props;
        if (loading ) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Server Error... {error.message}</div>;
        }
        const { article } = this.state;
        const { title, subtitle, SURtitle, author, slot, body, splash, image1, image2} = article;

        return (
            <div className="form__ArticleEdit">
                <form className="form__ArticleEdit" onSubmit={this.onSubmit}>
                    <div className="buttons is-space-between">
                        <h1 className="title">{this.props.title}</h1>
                        <Button className="is-danger" type="submit">
                            Submit
                        </Button>
                    </div>

                    <FieldText
                        name="title"
                        value={title}
                        onChange={this.onChange}
                        required={true}
                        placeholder="Title"
                    />

                    <FieldText
                        name="SURtitle"
                        value={SURtitle}
                        onChange={this.onChange}
                        required={true}
                        placeholder="SURtitle"
                    />

                    <FieldText
                        name="subtitle"
                        value={subtitle}
                        onChange={this.onChange}
                        required={true}
                        placeholder="Subtitle"
                    />

                    <FieldText
                        name="author"
                        value={author}
                        onChange={this.onChange}
                        required={true}
                        placeholder="Author"
                    />

                    <Columns>
                        <Columns.Column>
                            <FieldFile
                                label="Splash image"
                                name="splash_f"
                                onChange={this.onChange}
                                splash={splash}
                            />
                            <FieldFile
                                label="Image 1"
                                name="image1_f"
                                onChange={this.onChange}
                                splash={image1}
                            />
                            <FieldFile
                                label="Image 2"
                                name="image2_f"
                                onChange={this.onChange}
                                splash={image2}
                            />
                        </Columns.Column>

                        <Columns.Column size={2}>
                            <FieldSlot
                                label="Slot"
                                name="slot"
                                required={true}
                                value={slot}
                                onChange={this.onChange}
                            />
                        </Columns.Column>
                    </Columns>

                    <FieldMessage
                        label="Message"
                        name="body"
                        value={body}
                        onChange={this.onChange}
                        required={true}
                        placeholder="Title"
                    />
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
        fetchArticle: bindActionCreators(fetchArticle, dispatch),
        editArticle: bindActionCreators(editArticle, dispatch),

        restore_editArticle: bindActionCreators(restore_editArticle, dispatch),
        restore_newArticle: bindActionCreators(restore_newArticle, dispatch)
    }
};

export default connect(mapStateToProps, mapActionToProps)(Form);

