import { useState } from "react";
import { PasswordContainer, PasswordInput, ShowPasswordIcon, DontShowPasswordIcon } from "./items";

function PasswordComponent({ setPassword, checkInput, email }: { setPassword: Function, checkInput: Function, email: string }) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <PasswordContainer $isfocused={isFocused}>
            <PasswordInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={
                    (e) => {
                        const newPassword = e.target.value;
                        setPassword(newPassword);
                        checkInput(email, newPassword);
                    }
                }
                type={showPassword ? 'text' : 'password'}
                placeholder={showPassword ? 'password ?' : '**********'}
            />
            {showPassword ?
                <ShowPasswordIcon onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', color: 'white', fontSize: '1.3vw' }} /> :
                <DontShowPasswordIcon onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', color: 'white', fontSize: '1.3vw' }} />
            }
        </PasswordContainer>
    )
}

export default PasswordComponent;