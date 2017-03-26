import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClosetList from './components/ClosetList';
import ClothingItemCreate from './components/ClothingItemCreate';
import ClothingItemEdit from './components/ClothingItemEdit';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 55 }}>
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
                <Scene
                    key="clothingItemEdit"
                    component={ClothingItemEdit}
                    title="Edit Item"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
