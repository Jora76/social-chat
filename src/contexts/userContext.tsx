import { createContext, useContext, useEffect, useRef, useState } from 'react';

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
    token: '',
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

    const [token, setToken] = useState('');
    const electron = (window as any).electronAPI;
    const [logState, setLogState] = useState(0);

    const tokenRef = useRef(token);

    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    const isLogged = async (): Promise<boolean> => {
        const cookies = await electron.getCookies("http://localhost:3000");
        return cookies.length > 0;
    };

    const handleLogin = () => {
        electron.getCookies("http://localhost:3000").then((cookies: any) => {
            const userCookie = cookies.find((cookie: any) => cookie.name === 'user');
            const tokenCookie = cookies.find((cookie: any) => cookie.name === 'Token');
            if (userCookie) {
                const userString = userCookie.value;
                const userObject = JSON.parse(userString);
                setUser(userObject);
            }
            if (tokenCookie) {
                setToken(tokenCookie.value);
            }
        });
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await isLogged();
            if (loggedIn) {
                if (user.email === '' || token  === ''){
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
            token,
        }}>
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => {
    return useContext(userContext);
};