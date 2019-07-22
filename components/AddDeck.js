import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

// dev imports
import { addDeck } from '../actions';
import { red, orange } from '../utils/colors';

class AddDeck extends Component {
    state = {
        deckName: null,
        submitPressed: false
    };

    createDeck = () => {
        this.setState(() => {
            return {submitPressed: true}
        }, () => {
            if (!this.state.deckName) {
                return;
            }

            let deck = {
                title: this.state.deckName,
                cards: []
            };
            this.props.handleAddDeck(deck);

            // After deck creation, reset state and go back to main screen
            this.setState(() => {
                return {
                    deckName: null,
                    submitPressed: false
                };
            }, () => {
                this.props.navigation.goBack();
            });
        });
    };

    render() {
        const { deckName, submitPressed } = this.state;

        return (
            <View style={styles.container}>
                <View style={{alignSelf: 'stretch'}}>
                    <Text style={{textAlign: 'center'}}>What is the title of your new deck?</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            value={this.state.deckName}
                            placeholder='Deck Name'
                            onChangeText = {text => this.setState({deckName: text })}
                        />
                    </View>
                    {
                        !deckName && submitPressed && (
                            <Text style={{color: red}}>Deck name cannot be empty!</Text>
                        )
                    }
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={this.createDeck}
                        color={red}
                        title='Create Deck'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 75,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        borderBottomColor: orange,
        borderBottomWidth: 1,
        marginTop: 50,
        alignSelf: 'stretch'
    },
});

function mapDispatchToProps(dispatch) {
    return {
        handleAddDeck: (deck) => dispatch(addDeck(deck))
    }
}

export default connect(null, mapDispatchToProps)(AddDeck);