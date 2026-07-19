import {supabase} from '../supabaseClient.js'





const studentForm=document.getElementById("studentform")
const studentId=document.getElementById("studentid")
const studentName=document.getElementById("studentname")
const studentPhone=document.getElementById("studentphone")
const studentEmail=document.getElementById("studentemail")
const studentDepartment=document.getElementById("studentdepartment")
const studentCnic=document.getElementById("studentcnic")
const studentList=document.getElementById("studentlist")

studentForm.addEventListener('submit',async (e)=>{
        e.preventDefault()

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
    getAllStudents()
        
})

async function getAllStudents(){
    studentList.innerHTML=""
    const {data:student,error}=await supabase.from('student').select('*')
    if(error){
        console.log("Error fetching students: ",error.message)
    }   
    
        student.forEach(student=>{
        const studentCard=document.createElement('div')
        studentCard.className="studentcard"
        studentCard.innerHTML=`
        <p><Strong>Id:</Strong> ${student.id}<Strong>Name:</Strong> ${student.name}<Strong>Phone:</Strong> ${student.ph_no}<Strong>Email:</Strong> ${student.email}<Strong>Department:</Strong> ${student.department}<Strong>CNIC:</Strong> ${student.cnic}</p>
        <button class="deletebtn" data-id="${student.id}">Delete</button>
        <button class="editbtn" data-id="${student.id}">Edit</button>`;
        studentList.appendChild(studentCard)
})
    deleteStudent()
    editStudent()
}

getAllStudents()


function editStudent(){
        const editButton=document.querySelectorAll(".editbtn")
        editButton.forEach(button=>{
            button.addEventListener('click',async (e)=>{
              const card=e.target.closest('.studentcard')
                const studentId=e.target.dataset.id

                    if(e.target.textContent==="Edit"){
                        e.target.textContent="Update"
                        const p=card.querySelector('p')
                        
                        p.innerHTML=`<Strong>Name:<input type="text" class="edit-name"></Strong> <Strong>Phone:<input type="number" class="edit-phone"></Strong> <Strong>Email<input type="text" class="edit-email">:</Strong>
                        <Strong>Department:<input type="text" class="edit-depart"></Strong> `;
                    }
                    else{
                        const editedName=card.querySelector('.edit-name').value
                        const editedPhone=card.querySelector('.edit-phone').value
                        const editedEmail=card.querySelector('.edit-email').value
                        const editedDepartment=card.querySelector('.edit-depart').value
                      
                        const {data,error}=
                        await supabase.from('student').update({
                            name:editedName,
                            ph_no:editedPhone,
                            email:editedEmail, 
                            department:editedDepartment,
                        }).eq('id',studentId)
                        getAllStudents()
                    }
               
            })

        })

}


function deleteStudent(){
        const deleteButton=document.querySelectorAll(".deletebtn")
        deleteButton.forEach(button=>{
            button.addEventListener('click',async (e)=>{
                const studentId=e.target.dataset.id
                const {data,error}=await supabase.from('student').delete().eq('id',studentId)   
                getAllStudents()
            })
        })
}
