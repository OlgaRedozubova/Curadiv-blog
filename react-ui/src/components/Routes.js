import React, { Component } from 'react';
import { Route as RRR, Switch, Redirect } from 'react-router-dom';

//components
import Home from "./home/home";
import Login from "./login/login";
import Admin from "./admin/admin";
import Article from "./article/article";
import AdminArticle from "./admin/admin-article";
import AdminPodcast from "./admin/admin-podcast";

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/admin" component={Admin} />
                <Route path="/admin-article/:id" component={AdminArticle} />
                <Route path="/admin-article" component={AdminArticle} />
                <Route path="/admin-podcast/:id" component={AdminPodcast} />
                <Route path="/admin-podcast" component={AdminPodcast} />
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

         const  isLoggedIn = false;
        if (!isLoggedIn && !this.props.public) return <Redirect to={'/login'} />;
        if (this.props.public && this.props.redirect && isLoggedIn) return <Redirect to={'/'} />;
        if (this.props.public) return <RRR {...restProps} />;

        return <Redirect to={'/'} />;
    }
}