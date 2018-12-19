import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {Header} from "./Header"
import {Footer} from "./Footer"
import TodosList from "./TodosList"

export class TodoContainer extends React.Component {
    render () {
        return (
            <View>
                <Header />
                <TodosList />
            </View>   
        );
    }
}