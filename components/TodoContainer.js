import React from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { addTodo, removeTodos } from '../store/todo.action';

import TodosList from "./TodosList"

export class TodoContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newTodo: "",
        }

        this.textInput = null;

        this._handldleTodoInput = this._handldleTodoInput.bind(this);
        this._addNewTodo = this._addNewTodo.bind(this);
    }

    _handldleTodoInput(text) {
        this.setState({
            newTodo: text,
        });
    }

    _addNewTodo() {
        if (this.state.newTodo !== "") {
            this.props.addTodo(this.state.newTodo);
            this.textInput.clear();
            this.setState({
                newTodo: "",
            });
        }
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>
                        Vous avez {this.props.todos.length} todos !
                    </Text>
                    <Button style={{flex:1}}onPress={() => this.props.removeTodos()} title="Effacer les todos" />
                </View>

                <TodosList />
                <View style={{ height: '15%' }} style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ height: 5, backgroundColor: 'blue' }}></View>
                    <TextInput ref={input => { this.textInput = input }}
                        style={{ fontSize: 20, fontWeight: 'bold', }}
                        placeholder="nouveau todo"
                        onChangeText={(text) => this._handldleTodoInput(text)}
                    />
                    <Button onPress={() => this._addNewTodo()} title="Ajouter un todo" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: "10%",
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00f',
        flexDirection: 'row'
    },
    textHeader: {
        color: '#fff',
        fontSize: 24,
        flex: 2
    }
});

TodoContainer.propTypes = {
    addTodo: PropTypes.func.isRequired,
    removeTodos: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            isDone: PropTypes.bool.isRequired,
        })
    ).isRequired,
}
const mapStateToProps = state => ({
    todos: state.todos.list,
});
const mapDispatchToProps = dispatch => ({
    addTodo: name => dispatch(addTodo(name)),
    removeTodos: () => dispatch(removeTodos())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoContainer)