const Parent_Domain = import.meta.env.VITE_API_URL;

console.log(Parent_Domain)

export const TRANSACTIONAPI = {
    ADD_TRANSACTION : Parent_Domain+'transaction/add', //post
    GET_TRANSACTIONBYUSERID : Parent_Domain+'transaction/user/', //POST  /user/:userid
    GET_ALLTRANSACTIONS : Parent_Domain+'transaction/all', //POST  /user/:userid
    UPDATE_TRANSACTION : Parent_Domain+'transaction/update/', //put /update/:id
    DELETE_TRASACTION : Parent_Domain+'transaction/delete/', //delete /delete/:id
    STATISTICS_TRANSACTION : Parent_Domain+'transaction/statistics/',
    FILTERBY_TRANSACTION_TYPE : Parent_Domain+'transaction/type/',
    GET_ALLCATEGORYTRANSACTIONS : Parent_Domain+'transaction/category/all', //POST  /user/:userid
}

