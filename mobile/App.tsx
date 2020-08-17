import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react'
import AppStack from './src/routes/AppStack'
import UserContext from './src/Contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage';
import api from './src/services/api';

export default function App() {

  interface IUser {
    id: number
    name: string
    subject: string
    avatar: string
    whatsapp: string
    bio: string
    email: string
  }

  useEffect(() => {
    AsyncStorage.getItem('token').then(resp => {

      api.post('/auth', {}, {
        headers: {
          authorization: resp
        }
      }).then(respp => {
        setUser(respp.data)
        setToken(resp)
      }).catch(errr => {

      })

    }).catch(err => {

    })
  }, [])

  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | null>(null)

  return (
    <>
      <UserContext.Provider value={{
        token, user, setUser, setToken
      }}>
        <AppStack />
      </UserContext.Provider>
      <StatusBar style='light' />
    </>
  );
}