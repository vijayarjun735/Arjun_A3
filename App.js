import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from './screens/BookList';
import BookDetail from './screens/BookDetail';
import BorrowedBooks from './screens/BorrowedBooks';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen name="BookList" component={BookList} options={{ title: 'All Books' }} />
        <Stack.Screen name="BookDetail" component={BookDetail} options={{ title: 'Book Details' }} />
        <Stack.Screen name="BorrowedBooks" component={BorrowedBooks} options={{ title: 'My Books' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
