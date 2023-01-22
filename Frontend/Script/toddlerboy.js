import navbar from "./index.js"

let baseURL="https://dark-cyan-fish-yoke.cyclic.app"
let token=localStorage.getItem("token")


async function alldata(){
    try {
        let res= await fetch(`${baseURL}/products/toddler boy`)
        let data=await res.json()
        display(data)
        sortedData(data)
        
    } catch (error) {
        console.log(error)
    }
}
alldata()

function display(data){
    let products=document.getElementById("allProducts")
    products.innerHTML=`
         ${data.map((item)=>{
              return `
                <div id="product-child">
                    <img src="${item.image1}" alt="">
                    <hr>
                    <div id="cart-price">
                        <h3>$${item.price}</h3>
                        <button><i class="fa-regular fa-heart"></i></button>
                    </div>
                    <p id="mrp">${item.MRP}</p>
                    <p>${item.name}</p>
                    <p>Size- ${item.size}</p>
                    <p>Baby's Fashion | ${item.productfor}</p>
                    <button data-id=${item._id} id="add">Add to Cart</button>
                </div>
              `
         }).join("")}
        `   
    let addToCartBtns=document.querySelectorAll("#add")
     for(let addToCartBtn of addToCartBtns){
        addToCartBtn.addEventListener("click",(event)=>{
            if(token){
                let id=event.target.dataset.id
                cartItem(id)
            }else{
                alert("Please Login")
                window.location.href="./login.html"
            }
        })
     }
       
}

let sorted=document.getElementById("sort")
function sortedData(data){
    let temp=[...data]
    sorted.addEventListener("change",()=>{
        if(sorted.value==""){
            display(temp)
        }else if(sorted.value=="lth"){ 
             data.sort((a,b)=> a.price-b.price)
            display(data)
        }else if(sorted.value=="htl"){
            data.sort((a,b)=> b.price-a.price)
            display(data)
        }else if(sorted.value=="rating"){
            data.sort((a,b)=> a.rating-b.rating)
            console.log(data)
            display(data)
        }
    })
    
}

async function cartItem(id){
    try {
        let res=await fetch(`${baseURL}/products/one/${id}`)
        let data=await res.json()
       let {name,image1,price,MRP,size,color}=data

       let obj={name,image1,price,MRP,size,color,quantity:1}

       addedToCart(obj)
     
    } catch (error) {
        console.log(error)
    }
}

async function  addedToCart(obj){
    try {
        let res=await fetch(`${baseURL}/products/cart`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Authorization":token,
                "Content-Type":"Application/json"
            }
        })
        let data=await res.json()
       alert(data.msg)
    } catch (error) {
        console.log(error)
    }
}


/* <button id="new">New Arrival</button> */