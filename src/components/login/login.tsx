import { useState } from 'react';
import { Container, Header, Body, DivInput, Label, EmailInput, Footer, NextBtn, RegisterLink } from './items'
import { colorData } from '../colorData';
import PasswordComponent from './password/password';
import { useUser } from '../../contexts/userContext';

import { ClipLoader } from 'react-spinners';

function Login() {
    const electron = (window as any).electronAPI;

    const [nextable, setNextable] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [invalidCreds, setInvalidCreds] = useState(false);
    const [error, setError] = useState(false);

    const { setUser } = useUser();

    const checkInput = (newEmail: string, newPassword: string) => {
        if (newEmail.length > 0 && newPassword.length > 0) {
            setNextable(true);
        } else {
            setNextable(false);
        }
    }

    const handleForm = () => {
        setLoading(true);
        electron.sendToBackend('api/login', 'POST', {
            email: email,
            password: password
        })
            .then((response: any) => {
                console.log("resp : ", response);
                if (response.status !== 200) {
                    // console.log(response);
                    if (response.status === 401) {
                        setError(true);
                        setLoading(false);
                    } else {
                        setInvalidCreds(true);
                        setLoading(false);
                    }
                }
                if (response.ok === true) {
                    let resp = response.data;
                    console.log('data : ', resp);
                    const tokenCookie = {
                        url: 'http://localhost:3000',
                        name: 'Token',
                        value: resp.token,
                        expirationDate: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 365
                    };
                    try {
                        electron.setCookie(tokenCookie).then(() => {
                            const userObject = {
                                email: resp.email,
                                firstname: resp.name.split(' ')[0],
                                lastname: resp.name.split(' ')[1],
                                nickname: resp.nickname,
                                birthdate: resp.birthdate,
                                description: resp.description,
                                uuid: resp.uuid,
                                avatar: resp.Avatar
                            };
                            const cookie = {
                                url: 'http://localhost:3000',
                                name: 'user',
                                value: JSON.stringify(userObject),
                                expirationDate: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 365
                            };
                            try {
                                electron.setCookie(cookie).then(() => {
                                    setLoading(false);
                                    setUser(userObject);
                                });
                            } catch (error) {
                                setError(true);
                                console.error(error);
                            }
                        });
                    } catch (error) {
                        setError(true);
                        console.error(error);
                    }
                }
            });
    }

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: `${colorData.primary}` }}>
            <h1 style={{ color: `${colorData.quaternary}` }}>Welcome to Social Chat !</h1>
            <Container onKeyDown={(e) => {
                if (e.key === 'Enter' && nextable === true) {
                    handleForm();
                }
            }}>
                <Header>
                    <h1 style={{ color: `${colorData.quaternary}`, fontSize: '2vw' }}>Login</h1>
                </Header>
                <Body>
                    <DivInput>
                        <Label>Email: </Label>
                        <EmailInput type='email'
                            placeholder='JohnSmith@example.com'
                            onChange={(e) => {
                                const newEmail = e.target.value;
                                setEmail(newEmail);
                                checkInput(newEmail, password);
                            }}
                        />
                    </DivInput>
                    <DivInput>
                        <Label>Password: </Label>
                        <PasswordComponent
                            setPassword={setPassword}
                            checkInput={checkInput}
                            email={email}
                        />
                        {invalidCreds === true && <p style={{ color: 'red' }}>Invalid email or password</p>}
                    </DivInput>
                </Body>
                <Footer>
                    <NextBtn
                        $nextable={nextable}
                        $loading={loading}
                        onClick={() => {
                            if (nextable === false) {
                                return;
                            }
                            handleForm();
                        }}>
                        {loading === true ? <ClipLoader size={30} color={'white'} loading={loading} /> : 'Login'}
                    </NextBtn>
                    {error === true && <p style={{ color: 'red' }}>An error occured, please retry</p>}
                    <RegisterLink onClick={() => { electron.openExternal('http://localhost:3000/register') }}>Don't have account? Register</RegisterLink>
                </Footer>
            </Container>
        </div>
    );
}

export default Login;
