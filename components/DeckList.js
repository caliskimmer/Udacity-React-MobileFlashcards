import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import { connect } from 'react-redux';

// dev imported components
import DeckView from './DeckView';

// dev imported other
import { gray, lightGray } from '../utils/colors';

function DeckItem({deck, ...props}) {
    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
            background={TouchableNativeFeedback.Ripple(gray, false)}>
            <View style={styles.listItem}>
                <Text style={{fontSize: 18}}>{deck.title}</Text>
                <Text style={{color: gray, fontSize: 12}}>{`${deck.cards.length} cards`}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

class DeckList extends Component {
    goToDeckView(key) {
        const { navigation } = this.props;
        navigation.navigate({
            routeName: 'DeckNavigator',
            params: {title: key},
            action: navigation.navigate({ routeName: 'DeckView' })
        });
    }

    render() {
        const { decks } = this.props;

        return (
            <View>
                {
                    Object.keys(decks).length > 0
                        ? <FlatList
                            data={Object.keys(decks).map((key) => ({...decks[key], key}))}
                            renderItem={({item}) => <DeckItem deck={item} onPress={() => this.goToDeckView(item.key)} />}
                        />
                        : <Text style={{textAlign: 'center', padding: 15}}>You haven't created any decks.</Text>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 25,
        paddingHorizontal: 15,
        borderBottomColor: lightGray,
        borderBottomWidth: 1,
    }
});


function mapStateToProps({decks}) {
    return {
        decks
    };
}

export default connect(mapStateToProps)(DeckList);