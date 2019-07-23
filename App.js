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
import AddCard from './components/AddCard';
import QuizView from './components/QuizView';

// dev created misc imports
import reducer from './reducers';
import middleware from './middleware';
import { setNotification } from './utils/notifications';
import { white, orange } from './utils/colors';

// Tab Configuration on main screen
const tabRouteConfig = {
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <Ionicons name='md-filing' size={30} color={tintColor} />
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add',
            tabBarIcon: ({tintColor}) => <Ionicons name='md-add' size={30} color={tintColor} />
        }
    },
};
const tabNavigationConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        showIcon: true,
        activeTintColor: white,
        style: {
            height: 65,
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
        navigationOptions: ({navigation}) => ({
            headerStyle: {backgroundColor: orange},
            headerTintColor: white,
            headerTitle: navigation.state.params.title
        })
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerStyle: {backgroundColor: orange},
            headerTintColor: white,
            headerTitle: 'Add Card'
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: ({navigation}) => ({
            headerStyle: {backgroundColor: orange},
            headerTintColor: white,
            headerTitle: navigation.state.params.title
        })
    }
});

const MainContainer = createAppContainer(MainNavigator);

export default class App extends Component {
    componentDidMount() {
        // Needed to remove header padding for opaque status bars
        SafeAreaView.setStatusBarHeight(0);

        // Set notifications necessary for app
        setNotification();
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
