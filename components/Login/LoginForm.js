import React from 'react';
import propTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native-animatable';
import StyledInput from '../../components/StyledInput';
import StyledButton from '../../components/StyledButton';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
export default class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  };
  _handleOnChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };
  render() {
    return (
      <View style={styles.container} {...this.props}>
        <View>
          <StyledInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => this.passwordRef.focus()}
            onChangeText={value => this._handleOnChangeText('email', value)}
          />
          <StyledInput
            secureTextEntry
            clearTextOnFocus
            returnKeyType="done"
            style={styles.input}
            placeholder="Password"
            enablesReturnKeyAutomatically
            inputRef={element => (this.passwordRef = element)}
            onChangeText={value => this._handleOnChangeText('password', value)}
          />
          <StyledButton
            style={styles.loginButton}
            textStyle={styles.textStyle}
            text="Log in"
            onPress={e =>
              this.props.login(this.state.email, this.state.password)
            }
            isLoading={this.props.auth.loading}
          />
        </View>
        <TouchableOpacity onPress={() => this.props.linkPress()}>
          <Text style={styles.link}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
LoginForm.propTypes = {
  linkPress: propTypes.func.isRequired
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  loginButton: {
    height: 42,
    backgroundColor: Colors.defaultColor.PRIMARY_COLOR
  },
  textStyle: {
    color: Colors.defaultColor.PAPER_COLOR
  },
  input: {
    height: 42,
    color: Colors.defaultColor.PRIMARY_COLOR,
    backgroundColor: Colors.defaultColor.PAPER_COLOR,
    borderColor: '#BFBFC0',
    borderWidth: 0.3,
    borderRadius: Colors.Input.BORDER.RADIUS
  },
  link: {
    color: '#9999a3',
    alignSelf: 'center',
    padding: 20
  }
});