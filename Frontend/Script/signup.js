import navbar from "./index.js"
let baseURL="http://localhost:8080"

let signupform=document.getElementById("signup")

signupform.addEventListener("submit",(event)=>{
    event.preventDefault()
    let fname=document.getElementById("fname").value
    let lname=document.getElementById("lname").value;
    let email=document.getElementById("email").value;
    let pass=document.getElementById("pass").value;
    let cnfpwd=document.getElementById("cnf").value;
    
    if(pass==cnfpwd){
        let obj={
            firstname:fname,
            lastname:lname,
            email:email,
            password:pass
        }
        async function signup(){
            try {
                let res=await fetch(`${baseURL}/users/register`,{
                    method:"POST",
                    body:JSON.stringify(obj),
                    headers:{
                        "Content-Type":"Application/json"
                    }
                })
                let data=await res.json()
                alert(data.msg)
                window.location.href="./login.html"
                
            } catch (error) {
                console.log(error)
            }
           
        } 
        signup()

    }else{
        alert("Please input right Password")
    }
   
})