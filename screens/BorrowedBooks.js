import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/theme';

export default function BorrowedBooksScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('borrowedBooks').then(data => {
      setBorrowedBooks(data ? JSON.parse(data) : []);
    });
  }, []);

  const returnBook = async (id) => {
    const updated = borrowedBooks.filter(b => b.id !== id);
    await AsyncStorage.setItem('borrowedBooks', JSON.stringify(updated));
    setBorrowedBooks(updated);
    Alert.alert('Returned', 'Book returned successfully.');
  };

  if (borrowedBooks.length === 0)
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No borrowed books.</Text>
      </View>
    );

  return (
    <FlatList
      data={borrowedBooks}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <View style={styles.bookItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.author}</Text>
          <TouchableOpacity
            style={styles.returnBtn}
            onPress={() => returnBook(item.id)}
          >
            <Text style={styles.returnText}>Return</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  emptyText: { color: colors.secondary, fontSize: 17 },
  bookItem: {
    backgroundColor: "#fafbfc",
    borderRadius: 10,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 18, fontWeight: '600', color: colors.text },
  author: { color: colors.secondary, fontSize: 15, marginTop: 4, marginBottom: 8 },
  returnBtn: {
    alignSelf: 'flex-end',
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 7,
  },
  returnText: { color: colors.buttonText, fontWeight: '600', fontSize: 15 },
});
