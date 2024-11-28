// import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/home/home';
import Login from './components/login/login';
import { colorData } from './components/colorData';
import {useUser} from './contexts/userContext';

function App() {
  const {logState} = useUser();
  // let cookie = {
  //   url: "http://localhost:3000",
  //   name: "my-cookie",
  //   value: "cookie-value"
  // }
  // electron.setCookie(cookie);
  // electron.removeCookie("http://localhost:3000", "user");
  // electron.getCookies("http://localhost:3000").then((cookies: any) => {
  //   console.log(cookies);
  // });
  // const [logState, setLogState] = useState(0);

  // const isLogged = async (): Promise<boolean> => {
  //   const cookies = await electron.getCookies("http://localhost:3000");
  //   console.log(cookies);
  //   return cookies.length > 0;
  // };

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const loggedIn = await isLogged();
  //     if (loggedIn) {
  //       setLogState(1);
  //     } else {
  //       setLogState(2);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
    <div className="App">
      {logState === 1 &&
        <Home /> 
      }
      {
        logState === 2 &&
        <Login/>
      }
      {
        logState === 0 &&
        <div style={{backgroundColor: `${colorData.primary}`}}>Loading...</div>
      }
    </div>
  );
}

export default App;
