import navbar from "./index.js"
let baseURL = "http://localhost:8080"
let token = localStorage.getItem("token")
let name=localStorage.getItem("name")



let cartName=document.getElementById("cart-name")
cartName.innerText=`${name}'s Cart`


async function cartData() {
    try {
        let res = await fetch(`${baseURL}/products/allcart`, {
            headers: {
                "Authorization": token,
            }
        })
        let data = await res.json()
        if(data.length!=0){
            displayCart(data)
            displayCheckout(data)
        }else{
            displayEmpty()
        }
        
    } catch (error) {
        console.log(error)
    }
}
cartData()

function displayCart(data) {
    let leftSide = document.getElementById("left")

    leftSide.innerHTML = `
      ${data.map((item) => {
        return `
            <div id="one-cart">
                <img src="${item.image1}" alt="">
                <div id="desc">
                    <span>Baby's Fashion</span>
                    <br>
                    <span>${item.name}</span>
                    <br>
                    <span>size:${item.size}</span>
                    <br>
                    <span>color:${item.color}</span>
                </div>
                <div id="quant">
                    <span>Qty:</span>
                    <button data-id="${item._id}" id="decrement">-</button>
                    <span id="quantity">${item.quantity}</span>
                    <button data-id="${item._id}" id="increment">+</button>
                </div>
                <div id="remove">
                    <span id="pr">$${item.price}</span>
                    <br>
                    <span>${item.MRP}</span>
                    <br>
                    <button data-id="${item._id}" id="remove-btn">Remove</button>
                </div>
            </div>
         `
    }).join("")}
    `

    let incrementBtns=document.querySelectorAll("#increment")
   let decrementBtns=document.querySelectorAll("#decrement")

   for(let btn of incrementBtns){
       btn.addEventListener("click",(e)=>{
          let id=e.target.dataset.id
          upadteQuantity(id)
          
       })
   }
   for(let btn of decrementBtns){
        btn.addEventListener("click",(e)=>{
        let id=e.target.dataset.id
        upadteQuantity2(id)
        
        })
    }

    let removeBtns=document.querySelectorAll("#remove-btn")
    for(let removeBtn of removeBtns){
        removeBtn.addEventListener("click",(event)=>{
            let id=event.target.dataset.id;
            deleteCart(id)
        })
    }
}

function displayCheckout(data){
    let total=0;
    data.forEach((elem)=>{
        let price= +elem.quantity * +elem.price
        total+= price
    })
    let totalPrice=document.getElementById("total-price")
    totalPrice.innerText=`$${total}`
    let ordertotal=document.getElementById("order-total")
    ordertotal.innerText=`$${total+6}`
}

async function upadteQuantity(id){
  try {
    let res=await fetch(`${baseURL}/products/cart/one/${id}`,{
        headers:{
            Authorization:token
        }
    })
    let data=await res.json()
    let quantity=+data[0].quantity + 1
    incrementQuantity(quantity,id)    
  } catch (error) {
      console.log(error)
  }
}

async function upadteQuantity2(id){
    try {
      let res=await fetch(`${baseURL}/products/cart/one/${id}`,{
          headers:{
              Authorization:token
          }
      })
      let data=await res.json()
      let quantity=+data[0].quantity
      if(quantity<=1){
        quantity=1
      }else{
         quantity=quantity - 1
      }
      
      decrementQuantity(quantity,id)    
    } catch (error) {
        console.log(error)
    }
  }
  

async function incrementQuantity(quantity,id){
      let payload={quantity}
     try {
        let res2=await fetch(`${baseURL}/products/cart/update/${id}`,{
            method:"PATCH",
            body:JSON.stringify(payload),
            headers:{
                "Content-Type":"Application/json",
                Authorization:token
            }
         })
         let data2=await res2.json()
        cartData()
     } catch (error) {
        console.log(error)
     }
}

async function decrementQuantity(quantity,id){
    let payload={quantity}
   try {
      let res2=await fetch(`${baseURL}/products/cart/update/${id}`,{
          method:"PATCH",
          body:JSON.stringify(payload),
          headers:{
              "Content-Type":"Application/json",
              Authorization:token
          }
       })
       let data2=await res2.json()
      cartData()
   } catch (error) {
      console.log(error)
   }
}

async function deleteCart(id){
    try {
        let res= await fetch(`${baseURL}/products/cart/delete/${id}`,{
            method:"DELETE"
        })
        let data=await res.json()
        console.log(data)
        cartData()
        
    } catch (error) {
        console.log(error)
    }
}


let checkoutBtn=document.getElementById("checkout-btn")

checkoutBtn.addEventListener("click",()=>{
   window.location.href="./checkout.html"
})


function displayEmpty(){
    let leftSide=document.getElementById("left")
    leftSide.innerHTML=`
       <img src="./media/empty-cart.png" alt="">

    `
}