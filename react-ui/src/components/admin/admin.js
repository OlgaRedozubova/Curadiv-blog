import React, { Component } from 'react';

import {connect} from "react-redux";
import { articleActions } from '../../stores/_actions/article.action';

import { Columns, Container, Table, Button } from 'react-bulma-components';

class Admin extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isChecked: false,
            idArticle: ''
        }
    }

    componentWillMount() {
        //this.props.dispatch(articleActions.getAll());
        this.props.dispatch(articleActions.fetchArticles());
        console.log('componentDidMount => this =>', this);
    }
    onClick = (e, article) => {
        console.log('onclick => ', article, e);
    };

    onChange( value, article){
        console.log('onchange', value, article);
        this.setState({isChecked:value, idArticle:article._id});
        console.log('state =>', this.state);
        //this.setState({[key]:value}, {
          //   isChecked: !this.state.isChecked
        // })
    }
    render() {
        const {  error, loading,articles } = this.props;
     //   console.log('render => this =>', error, loading, articles);
        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div >
                <h1>Admin page</h1>
                <Container>
                    <Button>Edit</Button>
                    <Button>Arh</Button>
                    <Button>Del</Button>
                    <Button>Add</Button>
                </Container>
                <Container>
                    <Table>
                        <thead>
                            <th className="is-2">Check</th>
                            <th className="is_2">Slot</th>
                            <th className="is-5">Title</th>
                        </thead>
                        <tbody>
                        {!loading && articles &&

                        articles.map((article, index) =>

                            <tr >
                                <td>
                                    <input type="checkbox" name="check"
                                          // checked={this.state.isChecked}
                                           onChange={(e)=>this.onChange(e.target.checked, article)}
                                           //value={this.state[value]}
                                           // onClick={(e) => this.onClick(e, article)}
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
                <div>
                    {/*<Button variant="fab" color="primary" aria-label="Add" >*/}
                        {/*<AddIcon />*/}
                    {/*</Button>*/}
                    {/*<Button variant="fab" color="secondary" aria-label="Edit" >*/}
                        {/*<Icon>edit_icon</Icon>*/}
                    {/*</Button>*/}
                    {/*<Button variant="extendedFab" aria-label="Delete" >*/}
                        {/*<NavigationIcon  />*/}
                        {/*Extended*/}
                    {/*</Button>*/}
                    {/*<Button variant="fab" disabled aria-label="Delete">*/}
                        {/*<DeleteIcon />*/}
                    {/*</Button>*/}
                </div>
                <ul>
                    {!loading && articles &&

                    articles.map((article, index) =>
                        <li key={article.id}>
                            {article.title + ' ' + article.subTitle}
                            {/*{*/}
                            {/*article.deleting ? <em> - Deleting...</em>*/}
                            {/*: article.deleteError ? <span className="text-danger"> - ERROR: {article.deleteError}</span>*/}
                            {/*: <span> - <a onClick={this.handleDeleteUser(article.id)}>Delete</a></span>*/}
                            {/*}*/}
                        </li>
                    )
                    }
                </ul>
                }
            </div>
        )
    }
};

const mapStateToProps = state =>
    ({
        articles: state.articles.items,
        loading: state.articles.loading,
        error: state.articles.error,
    });

export default connect(mapStateToProps)(Admin);