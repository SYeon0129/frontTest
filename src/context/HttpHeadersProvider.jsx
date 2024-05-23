import { createContext, useState, useEffect } from "react";

export const HttpHeadersContext = createContext();

function HttpHeadersProvider({ children }) {
    const [headers, setHeaders] = useState({
        Authorization: ""
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("bbs_access_token");
        if (storedToken) {
            setHeaders({ Authorization: `Bearer ${storedToken}` });
        }
    }, []);

    const value = { headers, setHeaders };

    return (
        <HttpHeadersContext.Provider value={value}>
            {children}
        </HttpHeadersContext.Provider>
    );
}

export default HttpHeadersProvider;
