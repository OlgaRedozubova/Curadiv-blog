import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';

//helpes
import ClassNames from 'classnames';
import i18n from "../../utils/i18n";
//style
import './navbar-style.css';

export default class NavBar extends Component {
    render() {
        const { className, sticky, withBtn, uiStore, invite, auth } = this.props;
        const newClassName = ClassNames('NavBar', className, {
            sticky: sticky,
            //active: sticky && uiStore.scrollPosition > 80
        });
        const isLoggedIn = false;
        return(
            <div className={newClassName}>
                <Navbar color = 'info' fixed='top' display="flex">
                    <Navbar.Item display="flex">
                        <NavLink className="NavBar-link" to="/" activeClassName="selected">
                            {i18n.t('menu.home')}
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item display="flex">
                        <NavLink className="NavBar-link" to="/admin" activeClassName="selected">
                            Admin
                        </NavLink>
                    </Navbar.Item>
                    <Navbar.Item display="flex">
                        <NavLink className="NavBar-link" to="/login" activeClassName="selected">
                            {i18n.t('menu.login')}
                        </NavLink>
                    </Navbar.Item>
                </Navbar>
            </div>
        )
    }
}