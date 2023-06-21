import React from 'react'
import MyRoutes from './MyRoutes'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/lib/integration/react'
import { myStore, myPersistor } from './Reducer/Store'
const App = () => {
  return (
    <>
    <Provider store = {myStore}> 
    <PersistGate persistor={myPersistor}>
      <MyRoutes/>
      </PersistGate>
      </Provider>
      </>
  )
}

export default App
