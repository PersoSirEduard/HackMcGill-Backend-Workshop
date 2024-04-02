import * as React from 'react';
import { styled } from '@mui/material/styles';
import NamedAvatar from "./Avatar";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ReplyIcon from '@mui/icons-material/Reply';
import TextField from '@mui/material/TextField';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    return formattedDate;
}
  
export default function Post(props) {
    const { username, date, content, id, replies } = props;
    const maxChars = 200;
    const [expanded, setExpanded] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const [signal, setSignal] = React.useState(0);
    const [commentContent, setCommentContent] = React.useState('');
    const [usedChars, setUsedChars] = React.useState(0);
    const ref = React.useRef(null);

    React.useEffect(() => {
        fetch(`/api/post/${id}`, {
            method: "GET"
        }).then(async (res) => {
        if (res.status == 200) {
            const data = await res.json();
            setComments(data.comments);
        } else {
            const err = await res.text();
            alert(err);
        }
        }).catch((err) => {
            setComments([]);
        })
    }, [expanded, signal]);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    async function handleSubmitComment(event) {
        try {
            const res = await fetch("/api/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: commentContent,
                    parent: id
                })
            });
            
            if (res.status == 200) {
                const data = await res.json();
                replies.push(data._id);
                setCommentContent('');
                setUsedChars(0);
                setSignal(Math.random())
                setExpanded(true);
            } else {
                const err = await res.err();
                alert(err);
            }
        } catch (err) {
            console.log(err)
            alert("Connection error");
        }
    }

    function handleCommentChange(event) {
        const content = event.target.value;
        setCommentContent(content);
        setUsedChars(content.length);
    }

    return (
        <Card>
            <CardHeader
            avatar={
                <NamedAvatar alt={username} name={username}/>
            }
            action={
                <IconButton aria-label="settings" onClick={() => {}}>
                    <MoreVertIcon />
                </IconButton>
            }
            title={<b>{"@" + username}</b>}
            subheader={formatDate(date)}
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{mb: 5}}>
                {content}
            </Typography>

            <form noValidate autoComplete="off">
                <div style={{
                    marginTop: 10, 
                    display: "flex", 
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <TextField
                    label={"Reply to @" + username}
                    multiline
                    rows={1}
                    variant="outlined"
                    value={commentContent}
                    onChange={handleCommentChange}
                    fullWidth={true}
                />
                <span style={{color: usedChars>=maxChars ? "red" : "white", marginRight: 10, marginLeft: 10}}>
                {usedChars}/{maxChars}
                </span>
                <IconButton
                variant="contained"
                color="primary"
                onClick={handleSubmitComment}
                disabled={usedChars>=maxChars || usedChars == 0}
                >
                    <ReplyIcon />
                </IconButton>
                </div>
            </form>

            </CardContent>
            <CardActions disableSpacing>
            <p style={{marginLeft: 10}}>{replies.length} comment(s)</p>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Comments"
            >
                <ExpandMoreIcon />
            </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {comments.length == 0
                    ? <p style={{textAlign: 'center'}}>No comments.</p>
                    : <Box sx={{ ml: '5%', display: 'flex', justifyContent: 'center', borderLeft: "solid white 2px"}} ref={ref}>
                        <List sx={{width: '100%'}}>
                            {comments.map((comment, index) => (
                                <Post key={index} 
                                    id={comment._id}
                                    username={comment.author} 
                                    date={comment.date} 
                                    content={comment.content}
                                    replies={comment.comments}
                                />
                            ))}
                        </List>
                    </Box>
                }
            </Collapse>
        </Card>
    )
}