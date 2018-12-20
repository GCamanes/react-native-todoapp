import React, {Component} from 'react';
import {View, Button, TextInput} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {addTodo, removeTodos} from '../store/todo.action';

import {Header} from "./Header"
import {Footer} from "./Footer"
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
        }
    }

    render () {
        return (
            <View>
                <Header />
                <Button onPress={() => this.props.removeTodos()} title="Effacer les todos"/>
                <TodosList />
                <View style={{height: '15%'}} style={{flex:1, flexDirection: 'column'}}>
                    <View style={{height: 5, backgroundColor:'blue'}}></View>
                    <TextInput ref={input => { this.textInput = input }}
                        style={{fontSize: 20, fontWeight: 'bold',}}
                        placeholder="nouveau todo"
                        onChangeText={(text) => this._handldleTodoInput(text)}
                    />
                    <Button onPress={() => this._addNewTodo()} title="Ajouter un todo"/>
                </View>
            </View>
        );
    }
}

TodoContainer.propTypes = {
    addTodo: PropTypes.func.isRequired,
    removeTodos: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
    addTodo: name => dispatch(addTodo(name)),
    removeTodos : () => dispatch(removeTodos())
})
export default connect(
    null,
    mapDispatchToProps
)(TodoContainer)