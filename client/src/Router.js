import React from 'react';
import { Alert } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClosetList from './components/ClosetList';
import ClothingItemCreate from './components/ClothingItemCreate';
import ClothingItemEdit from './components/ClothingItemEdit';

const recommend = 'To get items based on the weather, say "recommend."';
const getAllClothes = 'To get all items in your closet, say "get all clothes."';
const sendAText = 'To send a text of your chosen outfit, say "send text."';
const getRecommendations = 'For recommendations of new clothes for your closet, say "get recommendations."';

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
                    onLeft={() => {
                        Alert.alert(
                            'Commands',
                            `${recommend}\n${getAllClothes}\n${sendAText}\n${getRecommendations}`,
                            [{ text: 'OK' }]
                        );
                        }
                    }
                    leftTitle="?"
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
