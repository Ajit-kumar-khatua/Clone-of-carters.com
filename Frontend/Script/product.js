import navbar from "./index.js"

let baseURL="http://localhost:8080"



async function alldata(){
    try {
        let res= await fetch(`${baseURL}/products/toddler girl`)
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
                    <p>Baby's Fashion | ${item.productfor}</p>
                    <button  onclick="sub()" id="new">New Arrival</button>
                </div>
              `
         }).join("")}
        `   
       
       
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


let pro=document.getElementById("product-child")
console.log(pro)

