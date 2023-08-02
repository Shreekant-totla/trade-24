import axios from "axios";
import { STOCK_SUCCESS,STOCK_FAILURE,STOCK_LOADING } from "./actionType";

export const getProduct = (dispatch)=>async()=>{
            try {
                dispatch({type:STOCK_LOADING})
                const req = await axios.get(`https://trade24.onrender.com/stocks`);
                dispatch({type:STOCK_SUCCESS,payload:req.data});
            } catch (error) {
                dispatch({type:STOCK_FAILURE})
            }
}