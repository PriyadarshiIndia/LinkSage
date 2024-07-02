const { createContext, Children, useEffect } = require("react");
const { default: useFetch } = require("./hooks/use-fetch");
const { getCurrentUser } = require("./db/apiAuth");


const UrlContext =  createContext();

const UrlProvider = ({Children}) => {
    const {data: user,loading, fn:fetchUser} =useFetch(getCurrentUser);

    const isAuthenticated =user?.role ==="authenticated";

    useEffect(()=>{
        fetchUser();
    },[])

    return <UrlContext.Provider value={{user,fetchUser,loading,isAuthenticated}} >{Children}</UrlContext.Provider>
}

export default UrlProvider;