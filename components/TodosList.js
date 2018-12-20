import React from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {addTodo, loadTodos} from '../store/todo.action';

import TodoItem from "./TodoItem"

export class TodosList extends React.Component {

    componentDidMount() {
        this.props.loadTodos();
    }
    displayTodos () {
        if (this.props.loading) {
            return <Text style={{fontSize: 20}}>Loading ....</Text>
        }
        return this.props.todos.map(
            (item, index) => <TodoItem key={item.id} todo={item} title={item.id+". "+item.title} isDone={item.isDone} />
        );
    }

    render() {
        console.log(this.props.todos);
        return (
            <View style={{height: '75%'}}>
                <ScrollView>
                    {this.displayTodos()}
                </ScrollView>
            </View>
        );
    }
}

TodosList.propTypes = {
    loadTodos: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
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
    loading: state.todos.loading,
});
const mapDispatchToProps = dispatch => ({
    loadTodos: () => dispatch(loadTodos()),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosList)