let showProductsBtn=document.querySelector("#show-all-products")
let sortAndSearch=document.querySelector("#sort-and-search")
let showallproduct=document.querySelector("#show-all-product")
let allProducts=document.getElementById("all-products")
let addProductsbtn=document.getElementById("addProduct")
let addproducts=document.getElementById("add-products")
let editProducts=document.querySelector("#edit-products")
let logoutnBtn=document.getElementById("logout")
let allorders=document.getElementById("show-orders")
logoutnBtn.addEventListener("click",function(){
    window.location.href="index.html"
})
let userBtn=document.getElementById("user")


let baseURL = "https://dark-cyan-fish-yoke.cyclic.app"
let token = localStorage.getItem("token")


let bag=[]
showProductsBtn.addEventListener("click",async function(){
    try {
        let res=await fetch(`${baseURL}/products`)     
        if(res.ok){
            let data=await res.json()
            bag=[...data]
            allProducts.style.display="block"
            addproducts.style.display="none"
            editProducts.style.display="none"
            allorders.style.display="none"
            display(data)
            sortedData(data)
            searchProducts(data)
        }       
    } catch (error) {
        alert(error)
    }
})


function display(data){
    // console.log(data)
    showallproduct.innerHTML=""
    showallproduct.innerHTML=`
   ${data.map((item)=>{
        let id=item._id
        let image=item.image1;
        let name=item.name;
        let size=item.size;
        let rating=item.rating;
        let price=item.price
       return  getAscard(image,name,size,rating,id,price)
     }).join("")}
   `
   let deleteBtns=document.querySelectorAll(".delete-btn")
    for(let deleteBtn of deleteBtns){
        deleteBtn.addEventListener("click",function(event){
                let id=event.target.dataset.id;
                deleteItem(id)
         })
    }   

    let editBtns=document.querySelectorAll(".edit-btn")
    for(let editbtn of editBtns){
        editbtn.addEventListener("click",function(event){
            allProducts.style.display="none"
            addproducts.style.display="none"
            editProducts.style.display="block"
            allorders.style.display="none"
            let id=event.target.dataset.id;
            editItem(id)
        })
    }

}

function getAscard(image,name,size,rating,id,price){
   return `
   <div>
      <img src="${image}" alt="">
      <h4>${name}</h4>
      <p>Price:$${price}</p>
      <p>Size:${size}</p>
      <p>Rating:${rating}</p>
     
      <button class="edit-btn" data-id=${id}>Edit</button>
      <button class="delete-btn" data-id=${id}>Delete</button>
      </div>
   `
}

let sorted_value=document.querySelector("#sorting-data")

function sortedData(data){
    let temp=[...bag]
    sorted_value.addEventListener("change",function(){
        if(sorted_value.value==""){
            display(temp)
        }
        else if(sorted_value.value=="lth"){
            data.sort((a,b)=> a.price-b.price)
            display(data)
        }else if(sorted_value.value=="htl"){
            data.sort((a,b)=> b.price-a.price)
            display(data)
        }
        else if(sorted_value.value=="rating"){
            data.sort((a,b)=> a.rating-b.rating)
            display(data)
        }
        
      }) 
}

function searchProducts(data){
    let searchMovie=document.querySelector("#search")
    searchMovie.addEventListener("input",function(){
      let searchedData =data.filter((item)=>{
            return item.name.toLowerCase().includes(searchMovie.value.toLowerCase())
        })
        
        display(searchedData)
        sortedData(searchedData)
    })
    
}

let inputForm=document.querySelectorAll("#input-form input")

addProductsbtn.addEventListener("click",function(){
    allProducts.style.display="none"
    addproducts.style.display="block";
    editProducts.style.display="none"  
    allorders.style.display="none"
    let formofinputs=document.querySelector("#input-form")
    formofinputs.addEventListener("submit",async function(event){
        event.preventDefault();
        let obj={}
        for(let i=0;i<inputForm.length-1;i++){
            obj[inputForm[i].id]=inputForm[i].value 
         }
         console.log(obj)
         let res=await fetch(`${baseURL}/products/add`,{
            method : "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
         })
          alert("Product Added to Database.")
         for(let i=0;i<inputForm.length-1;i++){
           inputForm[i].value =""
         }
    })
    
})

async function deleteItem(id){

    let res=await fetch(`${baseURL}/products/delete/${id}`,{
        method : "DELETE"
    })
    if(res.ok){
        alert("Item Deleted Sucessfully")
        let refresh=await fetch(`${baseURL}/products`)
        let data= await refresh.json()
        display(data)
        searchMovies(data)
        sortedData(data)
    }
    
}

let editInputs=document.querySelectorAll("#edit-form input")
async function editItem(id){
    let res=await fetch(`${baseURL}/products/one/${id}`)
    let data=await res.json()
   
    for(let i=0;i<editInputs.length-1;i++){
        editInputs[i].value=data[editInputs[i].id]
    }

    let editForm=document.querySelector("#edit-form")
    editForm.addEventListener("submit", async function(event){
        
        event.preventDefault()
        let obj={}
        for(let i=0;i<editInputs.length-1;i++){
           obj[editInputs[i].id]=editInputs[i].value
        }

        let editData= await fetch(`${baseURL}/products/update/${id}`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(obj)
        })
        if(editData.ok){
            alert("Product Data Edited Sucessfully.")
            for(let i=0;i<editInputs.length-1;i++){
                editInputs[i].value=""
            }
        }
    })
}

let orderBtn=document.getElementById("orders")
orderBtn.addEventListener("click",()=>{
      allProducts.style.display="none"
      addproducts.style.display="none"
      editProducts.style.display="none"
      allorders.style.display="block"
    
    allOrders()
    
})

async function  allOrders(){
    try {
        let res=await fetch(`${baseURL}/order/all`)
        let data=await res.json()
        displayOrders(data)
        
    } catch (error) {
        console.log(error)
    }
}

function displayOrders(data){
    allorders.innerHTML=`
    <h1>All Orders</h1>
       ${data.map((item)=>{
         return `<div>
                <h3>OrderId:- ${item._id}</h3>
                <p>Name:${item.name}</p>
                <p>Status:- ${item.status}</p>
                <br>
                <span>Change Status:-</span>
                <select name="" data-id="${item._id}" id="status">
                    <option value="">Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <p>Quantity:-${item.quantity}</p>
               </div>
               <hr>
            `
       }).join("")}
    `

    let statuses=document.querySelectorAll("#status")
    for(let status of statuses){
        status.addEventListener("change",(e)=>{
            let id=e.target.dataset.id
            let value=status.value
            updateStatus(id,value)
        })
    }
   
}

async function updateStatus(id,value){
    let obj={
        status:value
    }
    try {
        let res=await fetch(`${baseURL}/order/update/${id}`,{
            method:"PATCH",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"Application/json"
            }
        })
        let data=await res.json()
        allOrders()
        console.log(data)
        
    } catch (error) {
        console.log(error)
    }

}