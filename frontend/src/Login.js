import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useAuth } from './AuthProvider';

const CenteredContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  });

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isLogin) {
            const res = await fetch('/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            if (res.status == 200) {
                login(username);
            } else {
                setUsernameError("Invalid username or password");
                setPasswordError("Invalid username or password");
            }
        } else {
            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            if (res.status == 200) {
                login(username);
            } else {
                const data = await res.text();
                setUsernameError(data);
                setPasswordError(data);
            }
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        if (event.target.value.length < 2) {
            setUsernameError('Username must be at least 2 characters');
        } else if (!/^[a-zA-Z0-9]*$/.test(event.target.value)) {
            setUsernameError('Username must only contain letters and numbers')
        } else {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length < 5) {
            setPasswordError('Password must be at least 5 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleSwitchClick = () => {
        setIsLogin(!isLogin);
    };

    return (
        <CenteredContainer>
            <Typography variant="h4" gutterBottom>
                {isLogin
                    ? "Login"
                    : "Register"
                }
            </Typography>
            <form style={{ width: 400 }} autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={handleUsernameChange}
                    error={Boolean(usernameError)}
                    helperText={usernameError}
                    required
                    fullWidth
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={handlePasswordChange}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    required
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '1rem' }}
                    disabled={username.length < 2 || password.length < 5 || Boolean(usernameError) || Boolean(passwordError)}
                >
                {isLogin
                ? "Login"
                : "Register"
                }
                </Button>
            </form>
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>
                {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "
                }
                <Link component="button" onClick={handleSwitchClick}>
                    {isLogin
                        ? "Register"
                        : "Login"
                    }
                </Link>
                {' '}instead.
            </Typography>
        </CenteredContainer>
    );
}