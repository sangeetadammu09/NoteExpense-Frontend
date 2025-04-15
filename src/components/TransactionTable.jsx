import React from 'react';
import {Container, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination,
  Box, TableRow, TableHead, Paper, Typography, CircularProgress,
  EditIcon, DeleteIcon
} from "../utils/myMaterial";
import { useState } from 'react';
import moment from 'moment';
import DeleteModal from './DeleteModal';



function TransactionTable({ loading, transactions, getDeleteApiResponse, handleChangePage, 
  handleChangeRowsPerPage, page, rowsPerPage, totalCount, openUpdateModal}) {

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [transactionItem, setTransactionItem] = useState({});


  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const showUpdateModal = (item) => {
   // setIsUpdateModalVisible(true);
    openUpdateModal(item)
  
  };

  return (

    <Container style={{ 'marginTop': '20px' }}>
      <Typography gutterBottom variant="h5" component="div">Transaction List</Typography>
      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : transactions.length > 0 ? (
              transactions.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {moment(item.date).format('DD/MM/yyyy')}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {item.category ? item.category : '-'}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {item.amount}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {item.type}
                  </TableCell>
                  <TableCell>
                    <EditIcon style={{ color: 'black' }} onClick={() => { showUpdateModal(item)}} />
                    <DeleteIcon onClick={() => { showDeleteModal(), setTransactionItem(item) }}></DeleteIcon>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
           <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]} count={totalCount}
                rowsPerPage={rowsPerPage} page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}            
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <DeleteModal isDeleteModalVisible={isDeleteModalVisible} handleDeleteCancel={handleDeleteCancel}
        transactionItem={transactionItem} sendDeleteApiResponse={getDeleteApiResponse}></DeleteModal>
    
    </Container>
  );
}


export default TransactionTable