import React from 'react';

//helpers
import ClassNames from 'classnames';


//styles
import './login.css';


export default class Login extends React.Component {
    render() {
        const {className} = this.props;
        const newClassName = ClassNames('Login',className);

        return (
            <article className={newClassName}>
                <div>Login</div>
                {/*<Form title='Login' login flip/>*/}
            </article>
        );
    }
}
