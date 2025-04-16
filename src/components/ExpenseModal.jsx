import React from 'react';
import {
  Button, Dialog, DialogContent, DialogTitle, TextField, CloseIcon, Grid,
  Typography, Select, MenuItem} from "../utils/myMaterial";
import { useForm,Controller } from 'react-hook-form';
import { useAuthStore } from "../store/authStore";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import axios from "axios";
import { TRANSACTIONAPI } from "../store/apiConfig";
import "../style/modal.css";
import moment from 'moment';

function ExpenseModal({ isExpenseModalVisible,handleExpenseCancel,sendExpenseApiResponse,transactionCategory, transactionItem }) {
  const { user } = useAuthStore();
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('First Name is required')
      .min(3, 'First Name must be at least 3 characters')
      .max(50, 'First Name must not exceed 50 characters'),
    category: Yup.string()
      .required('Category is required'),
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount is required'),
      //.max(5, 'Amount must not exceed 5 digits'),
    date: Yup.date()
      .required('Date is required')
      .min("1969-11-13", "Date is too early")
      .typeError('Date is required')
    
  });

  const { register, handleSubmit, setValue, reset, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });


  const addExpense= (formData)=>{
    axios.post(TRANSACTIONAPI.ADD_TRANSACTION,formData).then((response)=>{
      //  console.log(response)
        if(response.data.status == 200){
          console.log(response)
          handleExpenseCancel();
          sendExpenseApiResponse(response.data)
            
        }
    })
    .catch((error)=>{
      //  console.log(error)
    })
   }

     const updateExpense = (formData) => {
    //   console.log(TRANSACTIONAPI.UPDATE_TRANSACTION)
       axios.put(TRANSACTIONAPI.UPDATE_TRANSACTION + `${transactionItem._id}`, formData).then((response) => {
         console.log(response)
         if (response.data.status == 200) {
           console.log(response)
           sendExpenseApiResponse(response.data)
           handleExpenseCancel();
   
         }
       })
         .catch((error) => {
      //     console.log(error)
         })
     }

  const onSubmit = (data) => {
    let payload = data;
    payload.userid = user._id,
    payload.type = "expense",
    transactionItem == null ? addExpense(data) : updateExpense(data);
  };


    // Update the form when initialData changes
    useEffect(() => {
  
      if (transactionItem) {
        setValue('date', moment(transactionItem.date).format('YYYY-MM-DD'));
        const fields = ['name', 'category', 'amount'];
        fields.forEach(field => setValue(field, transactionItem[field]));
      } else {
        reset()
      }
    }, [transactionItem, setValue])


    return (
      <React.Fragment>
        <Dialog open={isExpenseModalVisible} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
          <Grid container spacing={2}>
            <Grid size={11}>
            <Typography gutterBottom variant="h5" component="div">
            {
                 transactionItem == null ? 'Add Expense' : 'Edit Expense'
                }
              </Typography>
            </Grid>
            <Grid size={1}>
               <CloseIcon className="iconColor" onClick={handleExpenseCancel} />
            </Grid>
          </Grid>
          </DialogTitle>
          <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
              <TextField type="date" id="outlined-basic" fullWidth variant="outlined" className="text-margin-bottom"
                {...register('date')} error={errors.date?.message == undefined ? false : true} helperText={errors.date?.message} />

              <TextField id="outlined-basic" fullWidth label="Name" variant="outlined" className="text-margin-bottom"
                {...register('name')} error={errors.name?.message == undefined ? false : true} helperText={errors.name?.message} />

              <Grid size={6}>
                <TextField id="outlined-basic" fullWidth label="Amount" variant="outlined" className="text-margin-bottom"
                  {...register('amount')} error={errors.amount?.message == undefined ? false : true} helperText={errors.amount?.message} />
              </Grid>
              <Grid size={6}>
              <Controller name="category" control={control} defaultValue="" render={({field}) => (
               <Select fullWidth {...field} labelId="category-label" label="Category">
              {
                  transactionCategory.map((x)=>(
                    <MenuItem value={x.name} >{x.name}</MenuItem>
                  ))
                }
              </Select> )}/>              
              </Grid>
             
              </Grid>
              <Button className='buttonColor' variant="contained" type="submit">{
               transactionItem !==null ? 'Update' : 'Save'
              // transactionItem == null
                }
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}

export default ExpenseModal