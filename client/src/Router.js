import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClosetList from './components/ClosetList';
import ClothingItemCreate from './components/ClothingItemCreate';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Please Login" />
            </Scene>
            <Scene key="main">
                <Scene
                    onRight={() => Actions.clothingItemCreate()}
                    rightTitle="Add"
                    key="closetList"
                    component={ClosetList}
                    title="My Closet"
                    initial
                />
                <Scene
                    key="clothingItemCreate"
                    component={ClothingItemCreate}
                    title="Upload Image"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
