import { TextField, Button, Grid } from "@material-ui/core";
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from "react";
//import { TextField, Button,  } from "@material-ui/core";
import { db, serverTimestamp } from "../config/fire-config";
import { useAuth } from "../components/context/authUserContext";
import toast, { Toaster } from "react-hot-toast";
import { inputAdornmentClasses } from "@mui/material";

const AddnewPost = () => {

    const { authUser } = useAuth();
    //const [post, setPost] = useState('[]');
    const [input, setInput] = useState('');
    const addPost = (e) => {
        e.preventDefault();
        db.collection('posts').add({
            postBody: input,
            createdAt: serverTimestamp(),
            author: authUser.uid,
            commentCount: 0,
            likeCount: 0,
            userName: '',
            userImage: ''
        })
        //setPost([...post, input]);
        setInput('');
    };
    return (
        <>
            <div ClassName="App">
                <TextField
                    style={{
                        width: '90%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingTop: '50px',
                        fontWeight: 500
                    }}
                    value={input}
                    placeholder="what is on your mind"
                    multiline
                    row={5}
                    rowsMax={10}
                    onChange={(e) => setInput(e.target.value)} />
            </div>
            <div>
                <Button style={{ position: "absolute", right: "80%", bottom: "30%" }} variant="text" onClick={addPost}>Submit</Button>
                {/*<Button variant="text">Cancel</Button>*/}
            </div>

        </>
    )
}
export default AddnewPost;













