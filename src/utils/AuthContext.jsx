import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();

        try{
            const response =  await account.createEmailPasswordSession(credentials.email, credentials.password);
            console.log('LOGGED-IN', response)
        }catch(error) {
            console.log(error);
        }
    }

    //this is used to pass down the user object and handleUserLogin to all the child component because it is available in the context data...
    const contextData = {
        user,
        handleUserLogin
    }
    return <AuthContext.Provider value={contextData}>
                {loading ? <p>loading...</p> : children}
           </AuthContext.Provider>
}

export const useAuth = () => {return useContext(AuthContext)}
export default AuthContext