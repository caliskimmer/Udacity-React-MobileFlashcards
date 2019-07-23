import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// dev imported
import { green, red, blue } from '../utils/colors';
import {ListView} from "react-native-web";

function NoCardsInDeck() {
    return (
        <View style={styles.noResultsContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                You must have cards to take the quiz!
            </Text>
        </View>
    );
}

function QuizResults({numCorrect, deckSize, resetQuiz}) {
    const percentage = Math.round(numCorrect/deckSize*1000)/10;
    return (
        <View style={styles.resultContainer}>
            <View>
                <Text style={styles.resultTextMain}>You got</Text>
                <Text style={Object.assign({}, styles.resultTextMain, {color: green})}>{numCorrect}</Text>
                <Text style={styles.resultTextSecondary}>out of</Text>
                <Text style={Object.assign({}, styles.resultTextMain, {color: blue})}>{deckSize}</Text>
                <Text style={Object.assign({}, styles.resultTextSecondary, {marginTop: 25, fontWeight: 'bold'})}>
                        That's a {percentage}%!
                </Text>
            </View>

            <Button
                onPress={resetQuiz}
                title='Reset Quiz'/>
        </View>
    );
}

class QuizView extends Component {
    state = {
        whatQuestion: 1,
        currentQuestion: (this.props.deck && this.props.deck.cards[0]) ? this.props.deck.cards[0].question : null,
        currentAnswer: (this.props.deck && this.props.deck.cards[0]) ? this.props.deck.cards[0].answer : null,
        onQuestion: true,
        numCorrect: 0,
        quizComplete: false,
    };

    handleQuizUpdate = (isCorrect) => {
        // if quiz complete, update last answer and then switch to result view
        if (this.state.whatQuestion === this.props.deck.cards.length) {
            this.setState((prevState) => {
                return {
                    numCorrect: isCorrect ? prevState.numCorrect+1 : prevState.numCorrect,
                    quizComplete: true
                }
            });
            return;
        }

        this.setState((prevState, { deck }) => {
            return {
                whatQuestion: prevState.whatQuestion+1,
                currentQuestion: deck.cards[prevState.whatQuestion].question,
                currentAnswer: deck.cards[prevState.whatQuestion].answer,
                numCorrect: isCorrect ? prevState.numCorrect+1 : prevState.numCorrect,
                onQuestion: true
            };
        });
    };

    resetQuiz = () => {
        this.setState(() => {
            return {
                whatQuestion: 1,
                currentQuestion: this.props.deck.cards[0].question,
                currentAnswer: this.props.deck.cards[0].answer,
                onQuestion: true,
                numCorrect: 0,
                quizComplete: false
            };
        })
    };

    toggleAnswer = () => {
        this.setState((prevState) => {
            return {
                onQuestion: !prevState.onQuestion
            }
        })
    };

    render() {
        const {
            onQuestion,
            whatQuestion,
            quizComplete,
            numCorrect,
            currentQuestion,
            currentAnswer } = this.state;
        const { deck } = this.props;

        if (deck.cards.length === 0) {
            return (
                <NoCardsInDeck />
            );
        }

        if (quizComplete) {
            return (
                <QuizResults
                    numCorrect={numCorrect}
                    deckSize={deck.cards.length}
                    resetQuiz={this.resetQuiz}/>
            );
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text>{whatQuestion}/{deck.cards.length}</Text>
                </View>
                <View>
                    <Text style={styles.cardText}>
                        {onQuestion ? currentQuestion : currentAnswer}
                    </Text>
                    <TouchableOpacity
                        onPress={this.toggleAnswer}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', color: blue}}>
                            {onQuestion ? 'Answer' : 'Question'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <View style={{marginBottom: 25}}>
                        <Button
                            onPress={() => this.handleQuizUpdate(true)}
                            title='Correct'
                            color={green} />
                    </View>
                    <View>
                        <Button
                            onPress={() => this.handleQuizUpdate(false)}
                            title='Incorrect'
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
        padding: 25,
        justifyContent: 'space-between'
    },
    cardText: {
        textAlign: 'center',
        fontSize: 32,
        marginBottom: 25
    },
    buttonView: {
        marginBottom: 150,
        width: 150,
        alignSelf: 'center'
    },
    resultContainer: {
        flex: 1,
        padding: 25,
        justifyContent: 'space-around'
    },
    resultTextMain: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    resultTextSecondary: {
        fontSize: 18,
        textAlign: 'center'
    },
    noResultsContainer: {
        paddingHorizontal: 25,
        paddingVertical: 150,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

function mapStateToProps({ decks }, { navigation }) {
    const title = navigation.state.params.deck.title;
    return {
        deck: decks[title]
    }
}

export default connect(mapStateToProps)(QuizView);

