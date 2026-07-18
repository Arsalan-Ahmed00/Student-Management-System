import {supabase} from '../supabaseClient.js'

const {data,error}=await supabase.auth.getSession()

if(error){
    console.log("Its not connected the error is:  " , error.message)
}   else{
    console.log("Its connected the data is:  " , data)
}