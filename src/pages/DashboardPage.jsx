
import { useAuthStore } from "../store/authStore";
import Cards from "../components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import { TRANSACTIONAPI } from "../store/apiConfig";
import IncomeModal from "../components/IncomeModal";
import ExpenseModal from "../components/ExpenseModal";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";
import {Paginator} from "../utils/paginatorHelper";
import moment from "moment";
function DashboardPage({ pathname }) {
  const { user } = useAuthStore();
  // const { getTransactionByUserId, status, response,error} = useTransactionStore();
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  // all trasactions storing this array after that fetching into doc
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [pagination, setPagination] = useState(Paginator);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transactionLabelData, setTransactionLabelData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
  const [transactionCategory, setTransactionCategory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
   const [transactionItem, setTransactionItem] = useState(null);
   const [expenseDataForChart, setexpenseDataForChart] = useState([]);


  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
    setTransactionItem(null);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
 //   this.getTransactionByUserIdData()
  };

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
    setTransactionItem(null);

  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  
  };

  const getDeleteApiResponse =(deleteApiResponse) => {
  //  //console.log(deleteApiResponse)
    if(deleteApiResponse.status == 200){
     getTransactionByUserIdData();
    }
  };

  const getIncomeApiResponse =(response) => {
    //console.log(response)
    if(response.status == 200){
     getTransactionByUserIdData();
    }
  };

  const getExpenseApiResponse =(response) => {
   // //console.log(response)
    if(response.status == 200){
     getTransactionByUserIdData();
     
    }
  };


  const handleYearChange = (event)=>{
    //console.log(event.target.value);
    let selectedYear = event.target.value;
    getTransactionStatisticsByUserIdAndYearData(selectedYear);
    setSelectedYear(selectedYear)
  }


    const handleChangePage = (event, newPage) => {
   //   //console.log(newPage)
      setPage(newPage);
      pagination.pageNumber = newPage+1;
      getTransactionByUserIdData(pagination);
    };

  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Reset to first page
    };


    const openUpdateModal = (item)=>{
      //console.log(item)
      item.type == 'expense' ? setIsExpenseModalVisible(true) : setIsIncomeModalVisible(true);
      setTransactionItem(item);
    }


  const getTransactionByUserIdData = async(paginationfilter)=>{
    if(user){
    //  const data = await getTransactionByUserId(user._id,pagination);
    //  //console.log(data)
    await axios.post(TRANSACTIONAPI.GET_TRANSACTIONBYUSERID+`${user._id}`,paginationfilter)
			.then((response)=>{
       // setLoading(true);
		//		//console.log(response.data);
        const result = response.data;
        if(result.status == 200){
          const transactionData = result.data.transactionData;
          setTransactions(result.data.data)
          setIncome(transactionData.totalIncome);
          setCurrentBalance(transactionData.totalBalance);
          setExpense(transactionData.totalExpense);
          setTotalCount(result.data.totalItems);
          setRowsPerPage(paginationfilter.pageSize)
          //console.log('i am inside getTransactionByUserIdData')
          //setLoading(false)
        
        }
			})
			.catch((error)=>{
			//	//console.log(error)
			//	set({status: 400,data: response.null,error: error});
			})
   }
  }

  const getTransactionStatisticsByUserIdAndYearData = async(yearValue)=>{
    if(user){
    //  const data = await getTransactionByUserId(user._id,pagination);
    await axios.post(TRANSACTIONAPI.STATISTICS_TRANSACTION+`${yearValue}/${user._id}`)
			.then((response)=>{
        if(response.status == 200){
      //  console.log(response.data.data,'getTransactionStatisticsByUserIdAndYearData')
  
          let transactionStatisticsData = response.data.data;
          let incomeData = transactionStatisticsData.map((x)=> x.totalIncome);
          let expenseData = transactionStatisticsData.map((x)=> x.totalExpense);
          let labelData = transactionStatisticsData.map((x)=> x.month);

       //   //console.log(incomeData,expenseData,labelData);
          setIncomeData(incomeData);
          setExpenseData(expenseData);
          setTransactionLabelData(labelData)
          

        }
			})
			.catch((error)=>{
			//	//console.log(error)
			//	set({status: 400,data: response.null,error: error});
			})
   }
  }


  const getTransactionByType = async(yearValue,type)=>{
    if(user){
    //  const data = await getTransactionByUserId(user._id,pagination);
    //  //console.log(data)
    let payload = {
      yearid : yearValue,
      userid : user._id
    }
    await axios.post(TRANSACTIONAPI.FILTERBY_TRANSACTION_TYPE+`${type}`,payload)
			.then((response)=>{
       // setLoading(true);
		//		//console.log(response.data);
        const result = response.data;
        if(result.status == 200){
          const transactionTypeData = result.data;
          setexpenseDataForChart(transactionTypeData)
          //console.log('i am inside getTransactionByUserIdData')
          //setLoading(false)
        
        }
			})
			.catch((error)=>{
			//	//console.log(error)
			//	set({status: 400,data: response.null,error: error});
			})
   }
  }

  const getAllTransactionCategory = async()=>{
    if(user){
      let paginator = {pageNumber: 1,pageSize: 100}; 
    await axios.post(TRANSACTIONAPI.GET_ALLCATEGORYTRANSACTIONS,paginator)
			.then((response)=>{
        if(response.status == 200){  
       //   //console.log(response.data.data)
          setTransactionCategory(response.data.data)
         
        }
			})
			.catch((error)=>{
			//	//console.log(error)
				//set({status: 400,data: response.null,error: error});
			})
   }
  }

  useEffect(()=>{
      let date = new Date().getFullYear().toString()
      getTransactionByUserIdData(pagination);
      getTransactionStatisticsByUserIdAndYearData(date);
      getAllTransactionCategory();
      getTransactionByType(selectedYear,'expense')
  },[user])

  return (
	<div>
		<Cards showIncomeModal={showIncomeModal} showExpenseModal={showExpenseModal} income={income} expense={expense} currentBalance={currentBalance}/>
    <IncomeModal isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} 
    sendIncomeApiResponse={getIncomeApiResponse} transactionCategory={transactionCategory} transactionItem={transactionItem}>
    </IncomeModal>

    <ExpenseModal isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel}
    sendExpenseApiResponse={getExpenseApiResponse} transactionCategory={transactionCategory} transactionItem={transactionItem}>
    </ExpenseModal>

    <Charts incomeData={incomeData} expenseData={expenseData} labelData={transactionLabelData}  
    getTransactionStatisticsByUserIdAndYearData={getTransactionStatisticsByUserIdAndYearData} 
    handleYearChange={handleYearChange} selectedYear={selectedYear} expenseDataForChart={expenseDataForChart} />
		<TransactionTable transactions={transactions} getDeleteApiResponse={getDeleteApiResponse} handleChangePage={handleChangePage}
    rowsPerPage={rowsPerPage} page={page} totalCount={totalCount} loading={loading} handleChangeRowsPerPage={handleChangeRowsPerPage}
    openUpdateModal={openUpdateModal} />
	</div>
	 
  )
}

export default DashboardPage