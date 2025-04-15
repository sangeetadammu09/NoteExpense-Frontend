import axios from "axios";
import { TRANSACTIONAPI } from "../store/apiConfig";
import { create } from "zustand";

axios.defaults.withCredentials = true;

export const useTransactionStore = create((set) => ({
	getTransactionByUserId: async (userid,payload) => {
		try {
			await axios.post(TRANSACTIONAPI.GET_TRANSACTIONBYUSERID+`${userid}`,payload)
			.then((response)=>{
				console.log(response.data);
				return response.data
				//set({status: 200,data: response.data,error: null});
			})
			.catch((error)=>{
				console.log(error)
				set({status: 400,data: response.null,error: error});
			})
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

	
}));