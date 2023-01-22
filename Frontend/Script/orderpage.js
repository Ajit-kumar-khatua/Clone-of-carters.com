 import navbar from "./index.js"

 let baseURL = "https://dark-cyan-fish-yoke.cyclic.app"
 let token=localStorage.getItem("token")

 async function orderData(){
    try {
        let res= await fetch(`${baseURL}/order`,{
            method:"GET",
            headers:{
                Authorization:token
            }
        })
        let data=await res.json()
          displayData(data)
          displayCheckout(data)
    } catch (error) {
        console.log(error);
    }
 }

 orderData()


 function  displayData(data){
    let leftSide = document.getElementById("left")

    leftSide.innerHTML = `
      ${data.map((item) => {
        return `
            <div id="one-cart">
                <img src="${item.image}" alt="">
                <div id="desc">
                    <span>Baby's Fashion</span>
                    <br>
                    <span>${item.name}</span>
                    <br>
                    <span>Size : ${item.size}</span>
                    <br>
                    <span>Color : ${item.color}</span>     
                </div>
                <div id="quant">
                    <span>Status:</span>
                    <span id="quantity">${item.status}</span>
                    <br>
                    <span>Qty:</span>
                    <span id="quantity">${item.quantity}</span>
                </div>
                <div id="remove">
                    <span id="pr">$${item.price}</span>
                    <br>
                    <button data-id="${item._id}" id="remove-btn">Remove</button>
                </div>
            </div>
         `
    }).join("")}
    `
    
    let removebtns=document.querySelectorAll("#remove-btn")

    for(let removeBtn of removebtns){
        removeBtn.addEventListener("click",(event)=>{
            let id=event.target.dataset.id
            deleteOrder(id)
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
    totalPrice.innerText=`Total Price : $${total}.00`
}


async function deleteOrder(id){
    try {
        let res=await fetch(`${baseURL}/order/delete/${id}`,{
            method:"DELETE"
        })
        let data=await res.json()
        orderData()
    } catch (error) {
        console.log(error)
    }
}