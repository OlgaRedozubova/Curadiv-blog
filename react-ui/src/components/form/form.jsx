import React, { Component } from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {fetchArticle, editArticle} from "../../stores/_actions/article";

//components
import { Button,   Columns} from 'react-bulma-components';
import { Field, Label, Control, Input, Textarea } from 'react-bulma-components/lib/components/form';

//style
import './form.css';





class Form extends Component {
    constructor (props) {
        super(props);
        const isEdit = this.props.id.length > 0;
        this.form = React.createRef();
        this.onNewArticle = this.onNewArticle.bind(this);
        this.state = {
            form: {},
            title: '',
            subtitle: '',
            SURtitle: '',
            author: '',
            slot: '0',
            splash:'',
            image1:'',
            image2:'',
            splash_f:'',
            image1_f:'',
            image2_f:'',
            body: '',
            deleted: false,
            archived: false,
            isEdit: isEdit,
        };
    }


    componentDidMount() {
        const {id, article} = this.props;
        if (id)
            if (!article) {
                console.log('Component(Article) => componentWillMount => fetchArticle => id=', id);
                this.props.fetchArticle(id)
                    .then((res) => {
                        this.setState({
                            title: res.title,
                            subtitle: res.subtitle,
                            SURtitle: res.SURtitle,
                            author: res.author,
                            slot: res.slot,
                            splash: res.splash,
                            image1: res.image1,
                            image2: res.image2,
                            body: res.body,
                            deleted: false,
                            archived: false,
                        });
                        console.log('>>> res=>', this.state);
                    });
            } else {
                this.setState({
                    title: article.title,
                    subtitle: article.subtitle,
                    SURtitle: article.SURtitle,
                    author: article.author,
                    slot: article.slot,
                    splash: article.splash,
                    image1: article.image1,
                    image2: article.image2,
                    body: article.body,
                    deleted: false,
                    archived: false,
                });

            }

    }




    onNewArticle (formData) {
        console.log('history => ');
        if (formData) {
            axios.post('/api/admin/article', formData)
                .then(res => {
                    const article = res.data;
                    console.log('res=>', article);
                    window.location.href = '/admin'
                    //this.setState({ article });
                })
                .catch(err => {
                    console.log('err => ', err);
                })
        }

    }

    onEditArticle (formData) {

        if (formData) {
            axios.put('/api/admin/article', formData)
                .then(res => {
                    const article = res.data;
                    console.log('res=>', article);
                    //history.push(`/admin`);
                    window.location.href = '/admin'
                    //this.setState({ article });
                })
                .catch(err => {
                    console.log('err => ', err);
                })
        }

    }

    onChange = (e) => {
        // event to update state when form inputs change
        e.preventDefault();
        console.log('e.target.name => ', e.target.value);
        //editArticle()

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
            case 'image1_f':
                if (e.target.files[0]) {
                    this.setState({
                        image1_f: e.target.files[0],
                        image1: e.target.files[0].name
                    });
                } else {
                    this.setState({
                        image1_f: {},
                        image1: '',
                    });
                }
                break;
            case 'image2_f':
                if (e.target.files[0]) {
                    this.setState({
                        image2_f: e.target.files[0],
                        image2: e.target.files[0].name
                    });
                } else {
                    this.setState({
                        image2_f: {},
                        image2: '',
                    });
                }
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }

        //console.log('e.target.files[0] => ', e.target.files[0].name);
    };

    onSubmit = (e) => {
        e.preventDefault();
         const { title, subtitle, SURtitle, author, slot, splash, splash_f, image1, image1_f, image2, image2_f, body} = this.state;
        const {isEdit} = this.state;
        // const { title, subtitle, author, slot, splash, image1, image2, body} = this.props.article;

        let formData = new FormData();

        console.log('splash_f', splash_f);
        formData.append('_id', this.props.id);
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
        formData.append('deleted', false);
        formData.append('archived', false);

        console.log('onContinue => ', formData);

        if (!isEdit) {
            return this.onNewArticle(formData)
        } else {
            return this.onEditArticle(formData)
        }
    };
    render() {
        const { title, subtitle, SURtitle, author, slot, body, splash, image1, image2} = this.state;
        const { loading, article, error } = this.props;

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
                                name="title"
                                value={title}
                                onChange={this.onChange}
                                required={true}
                                placeholder="Title"
                            />
                        </Control>
                    </Field>

                    <Field>
                        <Control>
                            <Input
                                type="text"
                                name="SURtitle"
                                value={SURtitle}
                                onChange={this.onChange}
                                required={true}
                                placeholder="SURtitle"
                            />
                        </Control>
                    </Field>
                    <Field>
                        <Control>
                            <Input
                                type="text"
                                name="subtitle"
                                value={subtitle}
                                onChange={this.onChange}
                                required={true}
                                placeholder="Subtitle"
                            />
                        </Control>
                    </Field>
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

                    <Columns>
                        <Columns.Column>
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
                            <Field>
                                <Label>Image 1</Label>
                                <Control>
                                    <input
                                        type="file"
                                        name="image1_f"
                                        accept=".png"
                                        onChange={this.onChange}
                                    />
                                    <Label>{image1}</Label>
                                </Control>
                            </Field>
                            <Field>
                                <Label>Image 2</Label>
                                <Control>
                                    <input
                                        type="file"
                                        name="image2_f"
                                        accept=".png"
                                        onChange={this.onChange}
                                    />
                                    <Label>{image2}</Label>
                                </Control>
                            </Field>
                        </Columns.Column>
                        <Columns.Column size={2}>
                            <Field>
                                <Label>Slot</Label>
                                <Control>
                                    <Input
                                        onChange={this.onChange}
                                        name="slot"
                                        type="number"
                                        min="0"
                                        max="12"
                                        required={true}
                                        value={slot.toString()}
                                    />
                                </Control>
                            </Field>
                        </Columns.Column>
                    </Columns>

                    <Field>
                        <Label>Message</Label>
                        <Control>
                                <Textarea
                                    onChange={this.onChange}
                                    name="body"
                                    placeholder="Body"
                                    // required={true}
                                    value={body}
                                />
                        </Control>
                    </Field>
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
        editArticle: bindActionCreators(editArticle, dispatch)
    }
};

export default connect(mapStateToProps, mapActionToProps)(Form);

