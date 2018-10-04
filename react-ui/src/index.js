import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import App from './components/App';
import store from './stores';

import '../src/assets/stylesheets/style.css';

const renderApp = Component => {
    render(
        <AppContainer>
            <Provider store={store}>
                <App/>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept(() => renderApp(App));
}