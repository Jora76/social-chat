import { createContext, useContext, useEffect, useState } from 'react';

const userContext = createContext({
    user: {
        email: '',
        firstname: '',
        lastname: '',
        nickname: '',
        birthdate: '',
        uuid: '',
    },
    setUser: (user: any) => { },
    logState: 0,
});

export function UserProvider({ children }: any) {
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        nickname: '',
        birthdate: '',
        uuid: '',
    });

    const electron = (window as any).electronAPI;
    const [logState, setLogState] = useState(0);

    const isLogged = async (): Promise<boolean> => {
        const cookies = await electron.getCookies("http://localhost:3000");
        console.log(cookies);
        return cookies.length > 0;
    };

    const handleLogin = () => {
        electron.getCookies("http://localhost:3000").then((cookies: any) => {
            console.log(cookies);
            const userCookie = cookies.find((cookie: any) => cookie.name === 'user');
            if (userCookie) {
                const userString = userCookie.value;
                const userObject = JSON.parse(userString);
                setUser(userObject);
            }
        });
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await isLogged();
            if (loggedIn) {
                if (user.email === ''){
                    handleLogin();
                } else {
                    setLogState(1);
                }
            } else {
                setLogState(2);
            }
        };

        checkLoginStatus();
    }, [user]);

    return (
        <userContext.Provider value={{
            user,
            setUser,
            logState,
        }}>
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => {
    return useContext(userContext);
};