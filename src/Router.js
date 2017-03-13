import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClosetList from './components/ClosetList';
import ImageUpload from './components/ImageUpload';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Please Login" />
            </Scene>
            <Scene key="main">
                <Scene
                    onRight={() => Actions.imageUpload()}
                    rightTitle="Add"
                    key="closetList"
                    component={ClosetList}
                    title="My Closet"
                    initial
                />
                <Scene
                    key="imageUpload"
                    component={ImageUpload}
                    title="Upload Image"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
