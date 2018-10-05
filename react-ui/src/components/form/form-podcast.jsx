import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import  Button  from 'react-bulma-components/lib/components/button';

//components
import FieldFile from './field-file';
import FieldText from './field-text';

import {
    fetchPodcast, editArticle,
    restore_newPodcast,
    restore_editPodcast,
} from "../../stores/_actions/article";

//style
import './form.css';



class FormPodcast extends Component {
    constructor (props) {
        super(props);
        const isEdit = this.props.id.length > 0;
        this.form = React.createRef();

        this.state = {
            isEdit: isEdit,
            podcast:{}

        };
    }

    componentDidMount() {
        const {id, article} = this.props;
        if (id) {
            if (!article) {
                this.props.fetchPodcast(id)
                    .then((res) => {
                        this.setState({
                            podcast: {
                                ...res,
                                splash_f: {}
                            }
                        });
                    });
            } else {
                this.setState({
                    podcast: {
                        ...article,
                        splash_f: {}
                    }
                });

            }
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
        const podcast = {...this.state.podcast};

        switch (e.target.name) {
            case 'splash_f':
                if (e.target.files[0]) {
                    podcast.splash_f = e.target.files[0];
                    podcast.splash = e.target.files[0].name;
                } else {
                    podcast.splash_f = {};
                    podcast.splash = '';
                }
                break;
            default:
                podcast[e.target.name] = e.target.value;
        }
        this.setState({podcast: podcast});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { isEdit, podcast} = this.state;
        const {_id, author, splash, splash_f} = podcast;

        let formData = new FormData();

        formData.append('_id', _id);
        formData.append('author', author);
        formData.append('splash', splash);
        formData.append('splash_f', splash_f);

        if (!isEdit) {
            return this.onNew(formData)
        } else {
            return this.onEdit(formData)
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
        const { podcast } = this.state;
        const { author, splash } = podcast;

        return (
            <div className="form__ArticleEdit">
                <form className="form__ArticleEdit" onSubmit={this.onSubmit}>
                    <div className="buttons is-space-between">
                        <h1 className="title">{this.props.title}</h1>
                    </div>

                    <FieldText
                        name="author"
                        value={author}
                        onChange={this.onChange}
                        required={true}
                        placeholder="Author"
                    />
                    <FieldFile
                        label="Splash image"
                        name="splash_f"
                        onChange={this.onChange}
                        splash={splash}
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
        fetchPodcast: bindActionCreators(fetchPodcast, dispatch),
        editArticle: bindActionCreators(editArticle, dispatch),

        restore_editPodcast: bindActionCreators(restore_editPodcast, dispatch),
        restore_newPodcast: bindActionCreators(restore_newPodcast, dispatch)
    }
};

export default connect(mapStateToProps, mapActionToProps)(FormPodcast);

