import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()
import { ID } from "appwrite";

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        // setLoading(false)
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try{
            const accountDetails = await account.get();
            setUser(accountDetails)
        }catch(error){
            console.error(error)
        }
        setLoading(false)
    }
    
    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();

        try{
            const response =  await account.createEmailPasswordSession(
                credentials.email, 
                credentials.password);
            console.log('LOGGED-IN', response)
            const accountDetails = await account.get();
            console.log( accountDetails)
            setUser(accountDetails)

            navigate('/')
        }catch(error) {
            console.warning(error);
        }
    }

    const handleUserLogout = async () => {
        await account.deleteSession('current')
        setUser(null)
    }

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault()

        if(credentials.password1 !== credentials.password2 ) {
            alert('password do not match')
            return
        }
        try{
                let response = await account.create(
                    ID.unique(),
                    credentials.email,
                    credentials.password,
                    credentials.name
                    )
                console.log('REGISTERED:', response)
        }catch(error){
            console.error(error)
        }
    }
    //this is used to pass down the user object and handleUserLogin to all the child component because it is available in the context data...
    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    }
    return <AuthContext.Provider value={contextData}>
                {loading ? <p>loading...</p> : children}
           </AuthContext.Provider>
}

export const useAuth = () => {return useContext(AuthContext)}
export default AuthContext