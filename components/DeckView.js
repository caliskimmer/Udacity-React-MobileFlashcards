import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';

// dev imported
import { deleteDeck } from '../actions/';
import { green, red, lightGray } from '../utils/colors';

class DeckView extends Component {
    state = {
        willDelete: false
    };

    handleDeleteDeck(deck) {
        const { deleteDeck, navigation } = this.props;

        // notify component to not rerender when we're about to delete content
        this.setState(() => {
            return {
                willDelete: true
            }
        }, () => {
            deleteDeck(deck);
            navigation.goBack();
        });
    }

    goToAddCard() {
        const { navigation } = this.props;
        navigation.navigate({
            routeName: 'AddCard',
            params: {deck: this.props.data}
        });
    }

    shouldComponentUpdate() {
        return !this.state.willDelete;
    }

    render() {
        const {title, data} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.dataContainer}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
                        {title}
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: 14, color: lightGray}}>
                        {`${data.cards.length} cards`}
                    </Text>
                </View>
                <View>
                    <View style={styles.button}>
                        <Button
                            title='Add Card'
                            onPress={() => this.goToAddCard()}
                            color={green} />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title='Start Quiz'
                            onPress={() => { return null; }}
                            color={green} />
                    </View>
                    <View style={{marginVertical: 50}}>
                        <Button
                            title='Delete Deck'
                            onPress={() => this.handleDeleteDeck(data)}
                            color={red} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'space-between'
    },
    dataContainer: {
        marginTop: 150,
        alignSelf: 'center'
    },
    button: {
        marginVertical: 10,
    }
});

function mapStateToProps({decks}, {navigation}) {
    const title = navigation.state.params.title;
    return {
        title: title,
        data: decks[title]
    }
}

function mapStateToDispatch(dispatch) {
    return {
        deleteDeck: (deck) => dispatch(deleteDeck(deck))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(DeckView);