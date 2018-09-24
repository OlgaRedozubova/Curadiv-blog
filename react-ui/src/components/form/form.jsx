import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {connect} from "react-redux";

//helpers
import ClassNames from 'classnames';
import i18n from '../../utils/i18n';

//components
import InputWrapper from './input';
import {do_by_login, onLoginFailed} from "../../stores/_actions/auth";
import axios from "axios/index";


//style
import './form.css';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


class Form extends Component {
    static defaultProps = {
        isSignUp: false
    };

    constructor (props) {
        super(props);
        this.form = React.createRef();
        this.onContinue = this.onContinue.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onFormValueChanged = this.onFormValueChanged.bind(this);
        this.state = {
            checked: false,
            isValid: false,
            buttonDisabled: false,
            isValidRecaptcha: false,
            form: {
                invite_code: '',
                email: '',
                password: '',
                full_name: ''
            },
            error: undefined
        }
    }

    onFormValueChanged(field, value) {
        this.setState({form: {[field]: value}});
        console.log('value =>', value);
        // if (!this.props.login) {
        // 	this.oState.isValid = validateEmail(this.form.email) && this.form.full_name !== '' && this.form.password !== '';
        // }
    }

    onContinue(e) {
        console.log('onContinue');
        this.setState({error: undefined});
        e.preventDefault();

        this.props.location.hash = '';
        const {login} = this.props;

        if (!login) {
            // if (this.recaptchaInstance) this.recaptchaInstance.execute();
            // if (!this.state.checked) {
            //     this.checkIfTermsAccepted(this.onSignUp);
            //     return;
            // }
        //    return this.onSignUp();
        }

        this.onLogin();
    }

    onLogin() {
        const form = this.state.form;
        const {history, login, auth, invite} = this.props;
        const {onLogin} = auth;

        if (form.email !== '' && form.password !== '') {
            // if (validateEmail(form.email)) {
                onLogin(form)
                    .then(response => {
                        // GA_login('login-email', 'login', 'email');
                        // if (login) this.goToDashboard();
                        console.log('onLogin response => ', response);
                    })
                    .catch(error => {
                        console.log('onLogin error => ', error);
                        // if (error.status === 422) {
                        //     invite.updateSignUpEmail(form.email);
                        //     sessionStorage.setItem('email', form.email);
                        //     history.push(`/verification`)
                        // } else {
                        //     this.oState.error = i18n.t('messages.' + error.message_code);
                        // }
                    })
            // } else {
            //     this.oState.error = i18n.t('forms.invalidEmail');
            // }
        }
    };

    render() {
        const { classes } = this.props;
        const {buttonDisabled, error, form, checked} = this.state;
        const {className, login, invite, flip, auth} = this.props;
        const newClassName = ClassNames('Form', className);
        console.log('auth => ', this.props.auth);

        return (
            <div className={classes.root} ref={this.form}>
                <form onSubmit={this.onContinue} classeName = {classes.root} noValidate autoComplete="off">
                    {/*<FormControl component="fieldset" variant="filled">*/}
                        {/*<TextField*/}
                            {/*id="filled-email-input"*/}
                            {/*type="email"*/}
                            {/*name="email"*/}
                            {/*autoComplete="email"*/}
                            {/*margin="normal"*/}
                            {/*//variant="filled"*/}
                            {/*label={i18n.t('forms.email')}*/}
                            {/*value={form.email}*/}
                            {/*error={error === 'Invalid email address'}*/}
                            {/*// required={true}*/}
                            {/*onChange={e => this.onFormValueChanged('email', e.target.value)}*/}
                            {/*// onSetValue={this.SetValue}*/}
                            {/*// isLogin={this.props.login}*/}
                        {/*/>*/}
                        {/*<TextField*/}
                            {/*type="password"*/}
                            {/*id="filled-password-input"*/}
                            {/*label={i18n.t('forms.password')}*/}
                            {/*autoComplete="current-password"*/}
                            {/*margin="normal"*/}
                            {/*//variant="filled"*/}
                            {/*value={form.password}*/}
                            {/*// required={true}*/}
                            {/*onChange={e => this.onFormValueChanged('password', e.target.value)}*/}
                            {/*// onSetValue={this.SetValue}*/}
                            {/*// isLogin={this.props.login}*/}
                        {/*/>*/}
                        {/*<Button variant="contained" color="primary" >Login*/}
                        {/*</Button>*/}
                    {/*</FormControl>*/}


                    {/*<Button primary fat submit className="shadow btn" disabled={buttonDisabled}>*/}
                        {/*<span className="label">{login ? i18n.t('forms.login') : i18n.t('forms.sign_up')}</span>*/}
                    {/*</Button>*/}
                </form>
            </div>
        )
    }
}

// Form.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default Form;

// const mapStateToProps = state =>
//     ({
//         auth: [...state.auth]//.sort(sortFunction(state.sort))
//     });

// const mapDispatchToProps = dispatch =>
//     ({
//         onLogin (form){
//             return dispatch => {
//                 axios.get('/api/user/login', {...form})
//                     .then(response => {
//                         dispatch(do_by_login(response))
//                     })
//                     .catch(error => {
//                         dispatch(onLoginFailed(error))
//                     })
//             }
//         },
//
//         // onRemove(id) {
//         //     dispatch(removeUser(id))
//         // },
//         // onRate(id, rating) {
//         //     dispatch(rateUser(id, rating))
//         // }
//     });
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Form);
