import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Post from './Post';

export default function PostViewer(props) {
    const { signal } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const ref = React.useRef(null);
    const [messages, setMessages] = React.useState([]);
    const numPosts = 10;

    React.useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
        fetch(`/api/list/${numPosts}`, {
          method: "GET"
        }).then((res) => {
          if (res.status == 200) {
            res.json().then((data) => {
              console.log(data)
              setMessages(data);
            })
          } else {
            res.text().then((err) => {
              alert(err);
            })
          }
        }).catch((err) => {
          setMessages([]);
        })
    }, [signal]);

    return (
        <Box sx={{ pb: 7, display: 'flex', justifyContent: 'center', ...props}} ref={ref}>
            <List sx={{ width: isMobile ? '100%' : '60%'}}>
                {messages.map((post, index) => (
                  <Post key={index} 
                    username={post.author} 
                    date={post.date} 
                    content={post.content} 
                    id={post._id} 
                    replies={post.comments}
                  />
                ))}
            </List>
        </Box>
    );
}