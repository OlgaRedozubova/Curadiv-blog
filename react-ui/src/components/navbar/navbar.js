import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';

//helpes
import ClassNames from 'classnames';
import i18n from "../../utils/i18n";
//style
import './navbar-style.css';

export default class NavBar extends Component {
    render() {
        const { className, sticky } = this.props;
        const newClassName = ClassNames('NavBar', className, {
            sticky: sticky,
        });

        return(
            <div className={newClassName}>
                <Navbar className="nav-right nav-menu is-flex is-hidden-mobile" color = 'info'>
                    <NavLink className="navbar-item" to="/" activeClassName="selected">
                        {i18n.t('menu.home')}
                    </NavLink>

                    <NavLink className="navbar-item" to="/admin" activeClassName="selected">
                        Admin
                    </NavLink>

                    <NavLink className="navbar-item" to="/login" activeClassName="selected">
                        {i18n.t('menu.login')}
                    </NavLink>
                </Navbar>
            </div>
        )
    }
}