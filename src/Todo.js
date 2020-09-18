import React, { useState } from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Modal, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import db from './firebase';

function Todo(props) {

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    
    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    }
    
    const [modalStyle] = useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    };

    
      
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    })); 

    // update todo function
    const updateTodo = () => {
        // update todo with new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true }) // prevents you from overriding
        setOpen(false);
    }
    const classes = useStyles();
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit Todo</h2>
            <FormControl>
                {/* <InputLabel htmlFor="my-input">Write a todo</InputLabel> */}
                <Input placeholder={props.todo.todo} value={input} onChange={event => { setInput(event.target.value) }} />
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={updateTodo}
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
        </div>
    );
    
    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}>
                    <div>
                        {body}
                    </div>
                </Modal>

            <List className="todo__list">    
                <ListItem>
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.todo.todo} secondary="dummy deadline" />
                    <IconButton aria-label="delete" className={classes.margin}>
                        <EditIcon fontSize="medium" onClick={e => setOpen(true)} />
                    </IconButton>
                    <IconButton aria-label="delete" className={classes.margin}>
                        <DeleteIcon fontSize="medium" variant="contained" color="secondary" onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
                    </IconButton>
                </ListItem>
                
            </List>
        </>
    )
}

export default Todo;
