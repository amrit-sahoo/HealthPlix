import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';


const Button = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      disabled={props.isLoading}
      underlayColor='rgba(0,0,0,0.05)'
    >
      <View
        style={{ 
          ...styles.container,
          ...props.style,
        }}
      >
        {props.isLoading ? (
          <ActivityIndicator size='small' color='#fff' />
        ): (
        <Text
          numberOfLines={1}
          style={{
            fontSize: 18,
            color: '#fafafa',
            letterSpacing: 0.6
          }}
        >
          {props.text}
        </Text>
        )}
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5a85c4',
    height: 56,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 4,
  },
});

export default Button;