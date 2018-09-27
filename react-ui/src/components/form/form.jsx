import React, { Component } from 'react';
import axios from 'axios';
//components



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
            title: '',
            subtitle: '',
            author: '',
            slot: '',
            splash:'',
            image1:'',
            image2:'',
            body: '',
            deleted: false,
            archived: false,
            isEdit: isEdit,
        };
    }
    componentDidMount() {
        const {id} = this.props;
        if (id) {
            console.log('!!componentDidMount=>')
            axios.get(`/api/articles/${id}`)
                .then(res => {
                    const article = res.data;
                    console.log('res=>', res);
                    this.setState({
                        title: article.title,
                        subtitle: article.subtitle,
                        author: article.author,
                        slot: article.slot,
                        splash: article.splash,
                        image1: article.image1,
                        image2: article.image2,
                        body: article.body,
                        // deleted: false,
                        // archived: false,
                        // isEdit: isEdit,
                    });
                })
                .catch(err => {
                    console.log('err => ', err);
                })
            }

    }

    onNewArticle (formData) {
        console.log('history => ');
        if (formData) {
            axios.post('/api/articles', formData)
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
            axios.put('/api/articles', formData)
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
        switch (e.target.name) {
            case 'splash':
                this.setState({ splash: e.target.files[0] });
                break;
            case 'image1':
                this.setState({ image1: e.target.files[0] });
                break;
            case 'image2':
                this.setState({ image2: e.target.files[0] });
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { title, subtitle, author, slot, splash, image1, image2, body} = this.state;
        let formData = new FormData();
        console.log('this.state => ', this.state, title);

        formData.append('id', this.props.id);
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('author', author);
        formData.append('slot', slot);
        formData.append('splash', splash);
        formData.append('image1', image1);
        formData.append('image2', image2);
        formData.append('body', body);

        console.log('onContinue => ', formData);
        const {isEdit} = this.state;
        if (!isEdit) {
            //New Article
            return this.onNewArticle(formData)
        } else {
            return this.onEditArticle(formData)
        }

    }
    render() {
        const { title, subtitle, author, slot, body} = this.state;
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
                                        name="splash"
                                        onChange={this.onChange}
                                    />
                                </Control>
                            </Field>
                            <Field>
                                <Label>Image 1</Label>
                                <Control>
                                    <input
                                        type="file"
                                        name="image1"
                                        onChange={this.onChange}
                                    />
                                </Control>
                            </Field>
                            <Field>
                                <Label>Image 2</Label>
                                <Control>
                                    <input
                                        type="file"
                                        name="image2"
                                        onChange={this.onChange}
                                    />
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
                                        min="1"
                                        max="12"
                                        required={true}
                                        value={slot}
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

export default Form;
