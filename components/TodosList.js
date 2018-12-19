import React from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {addTodo, loadTodos} from '../store/todo.action';

export class TodosList extends React.Component {

    componentDidMount() {
        this.props.loadTodos();
    }
    displayTodos () {
        if (this.props.loading) {
            return <Text>Loading ....</Text>
        }
        return this.props.todos.map(
            (item, index) => <Text key={item.title+"_"+index}>{item.title}</Text>
        );
    }

    render() {
        console.log(this.props.todos);
        return (
            <View>
                <ScrollView style={{height: '85%'}}>
                    {this.displayTodos()}
                </ScrollView>
                <Button onPress={() => this.props.addTodo('formation ajoutée via redux')} title="Ajouter un todo"/>
            </View>
        );
    }
}

TodosList.propTypes = {
    addTodo: PropTypes.func.isRequired,
    loadTodos: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    todos: PropTypes.arrayOf(
        PropTypes.shape({
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
    addTodo: name => dispatch(addTodo(name)),
    loadTodos: () => dispatch(loadTodos()),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosList)