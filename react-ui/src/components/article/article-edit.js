import React from 'react';
import axios from 'axios';

//components
import Form from "../form/form";
import { Button, Container, Section, Columns, Hero, Heading} from 'react-bulma-components';
import { Field, Label, Control, Input, Textarea } from 'react-bulma-components/lib/components/form';

export default class ArticleEdit extends React.Component {
    constructor (props) {
        super(props);
        this.form = React.createRef();
        this.onContinue = this.onContinue.bind(this);
        this.onFormValueChanged = this.onFormValueChanged.bind(this);
        this.onNewArticle = this.onNewArticle.bind(this);
        this.state = {
            form: {
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
            }
        }
    }
    onFormValueChanged(field, value) {
        const form = this.state.form;
        form[field]=value;
        this.setState({form: form});
    }

    onContinue(e) {
        console.log('onContinue => ', this.state.form);
        e.preventDefault();
        this.props.location.hash = '';

        const {isEdit = false} = this.props;
        if (!isEdit) {
            //New Article
            return this.onNewArticle()
        }
    }
    onNewArticle () {
        const form = this.state.form;
        if (form) {
            axios.post('/api/articles', {...form})
                .then(res => {
                    const article = res.data;
                    console.log('res=>', res);
                    this.setState({ article });
                })
                .catch(err => {
                    console.log('err => ', err);
                })
        }

    }


    render() {
        const { form } = this.state;
        return (
            <div>
                <Hero>
                    <Container className="is-fluid">
                        <Hero.Body>
                            <Heading>New article</Heading>
                        </Hero.Body>
                    </Container>
                </Hero>
                <Section>
                    <Container className="is-fluid">

                    {/*<Form title='Edit'/>*/}
                    <form className="form__ArticleEdit" onSubmit={this.onContinue}>
                        <Field>
                            <Control>
                                <Input
                                    onChange={e => this.onFormValueChanged('title', e.target.value)}
                                    name="title"
                                    type="text"
                                    required={true}
                                    placeholder="Title"
                                    value={form.title}
                                />
                            </Control>
                        </Field>

                        <Field>
                            <Control>
                                <Input
                                    onChange={e => this.onFormValueChanged('subtitle', e.target.value)}
                                    name="subtitle"
                                    type="text"
                                    required={true}
                                    placeholder="Subtitle"
                                    value={form.subtitle}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Input
                                    onChange={e => this.onFormValueChanged('author', e.target.value)}
                                    name="author"
                                    type="text"
                                    required={true}
                                    placeholder="Author"
                                    value={form.author}
                                />
                            </Control>
                        </Field>

                        <Columns>
                            <Columns.Column>
                                <Field>
                                    <Label>Splash image</Label>
                                    <Control>
                                        <Input
                                            type="file"
                                            value={form.splash}
                                            onChange={e => this.onFormValueChanged('splash', e.target.value)}
                                        />
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Image 1</Label>
                                    <Control>
                                        <Input
                                            type="file"
                                            value={form.image1}
                                            onChange={e => this.onFormValueChanged('image1', e.target.value)}
                                        />
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Image 2</Label>
                                    <Control>
                                        <Input
                                            type="file"
                                            value={form.image2}
                                            onChange={e => this.onFormValueChanged('image2', e.target.value)}
                                        />
                                    </Control>
                                </Field>
                            </Columns.Column>
                            <Columns.Column size={2}>
                                <Field>
                                    <Label>Slot</Label>
                                    <Control>
                                        <Input
                                            onChange={e => this.onFormValueChanged('slot', e.target.value)}
                                            name="slot"
                                            type="number"
                                            min="1"
                                            max="12"
                                            required={true}
                                            value={form.slot}
                                        />
                                    </Control>
                                </Field>
                            </Columns.Column>
                        </Columns>
                        <Field>
                            <Label>Message</Label>
                            <Control>
                                <Textarea
                                    onChange={e => this.onFormValueChanged('body', e.target.value)}
                                    placeholder="Body"
                                    required={true}
                                    value={form.body}
                                />
                            </Control>
                        </Field>
                         <div className="buttons is-right">
                             <Button className="is-danger">
                                 Submit
                             </Button>
                         </div>

                    </form>
                </Container>
                </Section>
            </div>
        );
    }
}
