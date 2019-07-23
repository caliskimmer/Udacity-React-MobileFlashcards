import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Button,
    TextInput,
    View,
    Text
} from 'react-native';

// dev imported
import { addCard } from '../actions';
import { green, red, orange } from '../utils/colors';

class AddCard extends Component {
    state = {
        questionText: null,
        answerText: null,
        submitPressed: false
    };

    handleAddCard = () => {
        const { questionText, answerText } = this.state;
        const { addCard, navigation } = this.props;

        this.setState(() => {
            return {
                submitPressed: true
            }
        }, () => {
            // Both question and answer must have a value
            if (!questionText || !answerText) {
                return;
            }

            const card = {
                question: questionText,
                answer: answerText
            };

            addCard(card, navigation.state.params.deck);
            navigation.goBack();
        });
    };

    render() {
        const { submitPressed, questionText, answerText } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.questions}>
                    <View style={{alignSelf: 'stretch'}}>
                        <Text style={{textAlign: 'center'}}>What is your question?</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Add Question'
                                onChangeText={(text) => this.setState({questionText: text})}
                            />
                        </View>
                        {
                            submitPressed && !questionText && (
                                <Text style={{color: red}}>Question must not be blank!</Text>
                            )
                        }
                    </View>
                    <View style={{alignSelf: 'stretch', marginTop: 100}}>
                        <Text style={{textAlign: 'center'}}>...And what is the answer?</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Add Answer'
                                onChangeText={(text) => this.setState({answerText: text})}
                            />
                        </View>
                        {
                            submitPressed && !answerText && (
                                <Text style={{color: red}}>Answer must not be blank!</Text>
                            )
                        }
                    </View>
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={this.handleAddCard}
                        color={green}
                        title='Add Card'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'space-around'
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: orange
    }
});

function mapPropsToDispatch(dispatch) {
    return {
        addCard: (card, deck) => dispatch(addCard(card, deck))
    }
}

export default connect(null, mapPropsToDispatch)(AddCard);