import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class DeckView extends Component {
    render() {
        return (
            <View>
                <Text>DeckView!</Text>
            </View>
        );
    }
}

function mapStateToProps({decks}, {title}) {
    return {
        data: decks[title]
    }
}

export default connect(mapStateToProps)(DeckView);