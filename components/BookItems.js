import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function BookItem({ book, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{book.title}</Text>
        <Text>{book.author}</Text>
        <Text>{book.year}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  title: { fontWeight: 'bold', fontSize: 18 },
});
