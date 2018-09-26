import React, { Component } from 'react';
import { Route as RRR, Switch, withRouter, Redirect } from 'react-router-dom';

//components
import Home from "./home/home";
import Login from "./login/login";
import Admin from "./admin/admin";
import Article from "./article/article";
import ArticleEdit from "./article/article-edit";

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/admin" component={Admin} />
                <Route path="/article-edit/:id" component={ArticleEdit} />
                <Route path="/article-edit" component={ArticleEdit} />
                <Route path="/login" component={Login} redirect/>
                <Route path="/article/:id" component={Article} />
            </Switch>
        )
    }
};

class Route extends React.Component{
    static defaultProps = {
        public: true,
        redirect: false,
    };

    render() {
        const { ...restProps } = this.props;
        // const { isLoggedIn = false, isCheckingAuth = false} = this.props.auth;
         const  isLoggedIn = false;
        if (!isLoggedIn && !this.props.public) return <Redirect to={'/login'} />;
        if (this.props.public && this.props.redirect && isLoggedIn) return <Redirect to={'/'} />;
        if (this.props.public) return <RRR {...restProps} />;

        return <Redirect to={'/'} />;
    }
}