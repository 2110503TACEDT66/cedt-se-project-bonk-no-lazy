'use client'

import { store } from "./store"
import { Provider as ReactReduxProvider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

export default function({children}:{children:React.ReactNode}){

    let reduxPersister = persistStore(store)

    return (
        <ReactReduxProvider store={store}>
            <PersistGate loading={null} persistor={reduxPersister}>
                {children}
            </PersistGate>
        </ReactReduxProvider>
    )
}