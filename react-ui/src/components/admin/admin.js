import React, { Component } from 'react';

import {connect} from "react-redux";
import { articleActions } from '../../stores/_actions/article.action';

class Admin extends Component {

    componentWillMount() {
        //this.props.dispatch(articleActions.getAll());
        this.props.dispatch(articleActions.fetchArticles());
        console.log('componentDidMount => this =>', this);
    }
    render() {
        const {  error, loading,articles } = this.props;
        console.log('render => this =>', error, loading, articles);
        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Admin page</h1>

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