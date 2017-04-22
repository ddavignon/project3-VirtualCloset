import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClosetList from './components/ClosetList';
import ClothingItemCreate from './components/ClothingItemCreate';
import ClothingItemEdit from './components/ClothingItemEdit';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 50 }} >
            <Scene key="auth" >
                <Scene
                    key="login"
                    component={LoginForm}
                    title="Please Login"
                    titleStyle={styles.textStyle}
                    navigationBarStyle={styles.viewStyle}
                />
            </Scene>

            <Scene key="main">
                <Scene
                    // onRight={() => Actions.clothingItemCreate()}
                    // rightTitle="Add"
                    key="closetList"
                    component={ClosetList}
                    title="My Closet"
                    titleStyle={styles.textStyle}
                    initial
                    navigationBarStyle={styles.viewStyle}
                />
                <Scene
                    key="clothingItemCreate"
                    component={ClothingItemCreate}
                    title="Upload Image"
                    titleStyle={styles.textStyle}
                    navigationBarStyle={styles.viewStyle}
                />
                <Scene
                    key="clothingItemEdit"
                    component={ClothingItemEdit}
                    title="Edit Item"
                    titleStyle={styles.textStyle}
                    navigationBarStyle={styles.viewStyle}
                />
            </Scene>
        </Router>
    );
};

const styles = {
    viewStyle: {
        //backgroundColor: '#00BCD4', // 'rgb(0,188,212)',
        backgroundColor: '#333333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    textStyle: {
        fontSize: 20,
        //color: '#FFF'
        color: '#FFFFFF'
    }
};

export default RouterComponent;
