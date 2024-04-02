import PostViewer from './PostViewer';
import PostBox from './PostBox';
import { useAuth } from './AuthProvider';
import Login from './Login';
import { useEffect, useState } from 'react';

export default function AppContainer() {
    const { authenticated, username, login, logout } = useAuth();
    const [signal, setSignal] = useState(0);

    useEffect(() => {
        fetch("/api/auth", {
            method: "GET"
        }).then((res) => {
            if (res.status == 200) {
                res.text().then((val) => login(val))
            } else {
                logout();
            }
        }).catch((err) => {
            logout();
        })
    });

    function handleNewPost(post) {
        setSignal(Math.random())
    }

    return (
        <div>
            {authenticated 
            ? (
                <div>
                    <PostBox onNewPost={handleNewPost} />
                    <PostViewer pt={0} signal={signal}/>
                </div>
            )
            : <Login />
            }
        </div>
    );
}