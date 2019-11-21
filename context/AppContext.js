import React, { createContext, useReducer, useContext, useState } from "react"

const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  return(
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
