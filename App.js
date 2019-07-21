import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

// dev created component imports
import AddDeck from './components/AddDeck';
import DeckList from './components/DeckList';

// dev created misc imports
import reducer from './reducers';
import { white, orange } from './utils/colors';

const RouteConfig = {
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
    }
};

const NavigationConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: white,
        style: {
            height: 56,
            backgroundColor: orange,
        }
    }
};

const Tabs = createMaterialTopTabNavigator(RouteConfig, NavigationConfig);

const MainNavigator = createStackNavigator({
   Home: {
       screen: Tabs
   },
});

const MainContainer = createAppContainer(MainNavigator);

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
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

const styles = StyleSheet.create({
});

