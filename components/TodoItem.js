import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { updateTodo } from '../store/todo.action';

export class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todo: props.todo,
            title: props.title,
            isDone: props.isDone
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            todo: state.todo,
            title: state.title,
            isdone: state.isDone
        }
    }

    handleInputChange = (value) => {
        this.setState({ isDone: value })
        console.log('Switch ' + this.state.todo.id + ' is: ' + value)
        this.props.updateTodo(this.state.todo);
    }

    render() {
        return (
            <View style={styles.todoView}>
                {
                    (this.state.isDone) ? (
                        <Text style={styles.todo}>{this.state.title}</Text>
                    ) : (
                            <Text style={styles.todo}>{this.state.title}</Text>
                        )
                }
                <Switch value={this.state.isDone} onValueChange={this.handleInputChange} />
            </View>
        );
    }

    static defaultProps = {
        title: 'no todo text'
    };
}

const styles = StyleSheet.create({
    todoView: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    todo: {
        flex: 2,
        fontSize: 20,
        fontWeight: 'bold',
    },
    switch: {
        flex: 1,
    }
});

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    updateTodo: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
    updateTodo: todo => dispatch(updateTodo(todo)),
})

export default connect(
    null,
    mapDispatchToProps
)(TodoItem)