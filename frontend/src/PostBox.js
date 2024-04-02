import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


export default function PostBox(props) {
  const { onNewPost } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const maxChars = 200;
  const [postContent, setPostContent] = useState('');
  const [usedChars, setUsedChars] = useState(0);
  const [error, setError] = useState('');

  const handlePostChange = (event) => {
    const content = event.target.value;
    setPostContent(content);
    setUsedChars(content.length);
  };

  const handleSubmitPost = async () => {
    try {
      const res = await fetch('/api/post', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: postContent
        })
      })

      if (res.status == 200) {
        const data = await res.json();
        setPostContent("");
        setUsedChars(0);
        onNewPost(data);
      } else {
        const err = await res.text();
        setError(err);
      }
    } catch (err) {
      console.log(err);
      setError("Connection error")
    }

  };

  const handleCloseError = () => {
    setError('');
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: 100, paddingBottom: 0}}>
      <Card sx={{ width: isMobile ? '100%' : '60%'}}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            What's on your mind?
          </Typography>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                id="post-content"
                // label="What's happening?"
                multiline
                rows={4}
                variant="outlined"
                value={postContent}
                onChange={handlePostChange}
                fullWidth={true}
              />
              <div style={{
                marginTop: 10, 
                display: "flex", 
                flexDirection: "row",
                alignItems: "center",
              }}>
                <div style={{flex: 1}}></div>
                <span style={{color: usedChars>=maxChars ? "red" : "white", marginRight: 10}}>
                  {usedChars}/{maxChars}
                </span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitPost}
                  disabled={usedChars>=maxChars || usedChars == 0}
                >
                  Share
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={error.length != 0}
        autoHideDuration={6000}
        onClose={handleCloseError}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
