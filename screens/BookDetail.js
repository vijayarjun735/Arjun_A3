import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/theme';

export default function BookDetailScreen({ route }) {
  const { book } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('borrowedBooks').then(data => {
      setBorrowedBooks(data ? JSON.parse(data) : []);
    });
  }, []);

  const borrowBook = async () => {
    if (borrowedBooks.find(b => b.id === book.id)) {
      Alert.alert('Already Borrowed', 'You have already borrowed this book.');
      return;
    }
    if (borrowedBooks.length >= 3) {
      Alert.alert('Limit Reached', 'You cannot borrow more than 3 books at a time.');
      return;
    }
    const newBorrowed = [...borrowedBooks, book];
    await AsyncStorage.setItem('borrowedBooks', JSON.stringify(newBorrowed));
    setBorrowedBooks(newBorrowed);
    Alert.alert('Success', 'Book borrowed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.year}>{book.year}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <TouchableOpacity style={styles.borrowBtn} onPress={borrowBook}>
        <Text style={styles.borrowText}>Borrow</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 8 },
  author: { fontSize: 17, color: colors.secondary, marginBottom: 2 },
  year: { fontSize: 14, color: colors.secondary, marginBottom: 16 },
  description: { fontSize: 16, color: colors.text, marginBottom: 36 },
  borrowBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 7,
  },
  borrowText: { color: colors.buttonText, fontWeight: '600', fontSize: 16 },
});
