import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)

	console.log(currentUser && currentUser)
	
	const login = userData => {
		setCurrentUser(userData)
	}
	const logout = () => {
		setCurrentUser(null)
	}

	return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
}
