import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import {
    createMaterialTopTabNavigator,
    createStackNavigator,
    createAppContainer,
    SafeAreaView
} from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

// dev created component imports
import AddDeck from './components/AddDeck';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';
import DeckConfig from './components/DeckConfig';

// dev created misc imports
import reducer from './reducers';
import middleware from './middleware';
import { white, orange } from './utils/colors';

// Tab Configuration on main screen
const tabRouteConfig = {
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <Ionicons name='filing' size={30} color={tintColor} />
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add',
            tabBarIcon: ({tintColor}) => <Ionicons name='add' size={30} color={tintColor} />
        }
    },
};
const tabNavigationConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: white,
        style: {
            height: 56,
            backgroundColor: orange,
        }
    },
};
const Tabs = createMaterialTopTabNavigator(tabRouteConfig, tabNavigationConfig);

// Set up universal stack navigator
const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            headerStyle: {backgroundColor: orange},
            headerTintColor: white,
            headerTitle: 'DeckView'
        }
    }
});

const MainContainer = createAppContainer(MainNavigator);

export default class App extends Component {
    componentDidMount() {
        // Needed to remove header padding for opaque status bars
        SafeAreaView.setStatusBarHeight(0);
    }
    render() {
        return (
            <Provider store={createStore(reducer, middleware)}>
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor={orange}
                        barStyle='light-content' />
                    <MainContainer />
                </View>
            </Provider>
        );
    }
}
