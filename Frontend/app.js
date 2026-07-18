import {supabase} from '../supabaseClient.js'





const studentForm=document.getElementById("studentform")
const studentId=document.getElementById("studentid")
const studentName=document.getElementById("studentname")
const studentPhone=document.getElementById("studentphone")
const studentEmail=document.getElementById("studentemail")
const studentDepartment=document.getElementById("studentdepartment")
const studentCnic=document.getElementById("studentcnic")


studentForm.addEventListener('submit',async (e)=>{
   

    const id=studentId.value
    const name=studentName.value
    const phone=studentPhone.value
    const email=studentEmail.value
    const department=studentDepartment.value
    const cnic=studentCnic.value

    const {data,error}=await supabase.from('student').insert([
        {id:id,name:name,ph_no:phone,email:email,department:department,cnic:cnic}
    ])

        if(error){
            console.log("Data cannot be inserted due to error: ",error.message)
        }
        else{
            console.log("Data inserted successfully")
              studentId.value = "";
        studentName.value = "";
        studentPhone.value = "";
        studentEmail.value = "";
        studentDepartment.value = "";
        studentCnic.value = "";
        }
        
})


