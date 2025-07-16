import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { colors } from '../styles/theme';

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      setBooks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.topButton}
        onPress={() => navigation.navigate('BorrowedBooks')}
      >
        <Text style={styles.buttonText}>My Books</Text>
      </TouchableOpacity>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate('BookDetail', { book: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  topButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.accent,
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText: { color: colors.buttonText, fontWeight: '600', fontSize: 15 },
  bookItem: {
    backgroundColor: "#fafbfc",
    borderRadius: 10,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 18, fontWeight: '600', color: colors.text },
  author: { color: colors.secondary, fontSize: 15, marginTop: 4 },
});