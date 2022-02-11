import { TextField, Button } from "@material-ui/core";
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
            userImageUrl: ''
        })
        //setPost([...post, input]);
        setInput('');
    };
    return (
        <>
            <div className="App">
                <TextField
                    value={input}
                    placeholder="what is on your mind"
                    multiline
                    row={5}
                    rowsMax={10}
                    onChange={(e) => setInput(e.target.value)} />
            </div>
            <div>
                <Button variant="text" onClick={addPost}>Submit</Button>
                {/*<Button variant="text">Cancel</Button>*/}
            </div>
        </>
    )
}
export default AddnewPost;













