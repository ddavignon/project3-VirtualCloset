import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import { STTandroid, STTios } from 'react-native-speech-to-text';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
