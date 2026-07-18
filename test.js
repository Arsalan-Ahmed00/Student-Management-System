import {supabase} from './supabaseClient.js'

const {data,error}=await supabase.auth.getSession()

if(error){
    console.log("Error in getting session: ",error.message)
}else{console.log("Session data: ",data)}