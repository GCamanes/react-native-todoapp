import React from 'react';
import {Text, View, ScrollView} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {loadTodos} from '../store/todo.action';

import TodoItem from "./TodoItem"

export class TodosList extends React.Component {

    componentDidMount() {
        this.props.loadTodos();
    }
    displayTodos () {
        if (this.props.loading) {
            return <Text style={{fontSize: 20}}>Chargement ....</Text>
        }
        if (this.props.todos.length > 0) {
            return this.props.todos.map(
                (item) => <TodoItem key={item.id} todo={item} title={item.id+". "+item.title} isDone={item.isDone} />
            );
        } else {
            return <Text style={{fontSize: 20}}>Pas de todo sauvegardés</Text>
        }

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