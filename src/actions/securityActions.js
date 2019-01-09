import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch  => {
    try{
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload:{}
        });
    }catch(err){
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        });
    }
}

export const login = LoginRequest => async dispatch  => {
    

    try{
      //  console.log(LoginRequest);
        // post Login Request
        const res =  await axios.post("/api/users/login", LoginRequest);
        // extract the token form res.data
        const {token} = res.data;
        // Store the token in the localstorage
        localStorage.setItem("jwtToken", token);
        // set our token in header ***
        setJWTToken(token);
        // Decode the token on React
        const decoded = jwt_decode(token);
        // dispatch to our szecurityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload:decoded
        });
    }catch(err){
        //console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        });
    }
};

export const logout = () => dispatch  => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload:{}
    });
};