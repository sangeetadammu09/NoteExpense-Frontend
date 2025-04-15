import React from 'react';
import {Button,Dialog,DialogContent,DialogTitle,TextField,CloseIcon,Grid,Typography} from "../utils/myMaterial";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { TRANSACTIONAPI } from "../store/apiConfig";
import "../style/modal.css";

function DeleteModal({handleDeleteCancel,isDeleteModalVisible,transactionItem,sendDeleteApiResponse}) {
    const { user } = useAuthStore();
 
    const deleteTransaction= (id)=>{
      axios.delete(TRANSACTIONAPI.DELETE_TRASACTION+`${id}`).then((response)=>{
          console.log(response.status)
          if(response.status == 200){
            console.log(response)
            sendDeleteApiResponse(response.data)
            handleDeleteCancel();
              
          }
      })
      .catch((error)=>{
          console.log(error)
      })
     }
  
    const confirmDelete = async() => {
      console.log(transactionItem)
      await deleteTransaction(transactionItem._id)
    };
  
  return (
    <React.Fragment>
    <Dialog open={isDeleteModalVisible} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
      <Grid container spacing={2}>
        <Grid size={11}>
        <Typography gutterBottom variant="h5" component="div">
          Confirmation
          </Typography>
        </Grid>
        <Grid size={1}>
           <CloseIcon className="iconColor" onClick={handleDeleteCancel} />
        </Grid>
      </Grid>
      </DialogTitle>
      <DialogContent>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Are you sure you want to delete this transaction?
          </Typography>
          <Button className="buttonColor" variant="contained" onClick={confirmDelete}>Delete</Button>
      </DialogContent>
     
    </Dialog>
  </React.Fragment>
  )
}

export default DeleteModal