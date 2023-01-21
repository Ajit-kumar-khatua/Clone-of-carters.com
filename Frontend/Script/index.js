let name=localStorage.getItem("name")
let token=localStorage.getItem("token")
let child1 = document.getElementById("child1")
let child2 = document.getElementById("child2")

function navbar() {
    if (token) {
        child1.innerHTML = `
        <div>
            <a href="#">Baby's Fashion</a>
            <a href="#">OshKOsh</a>
            <a href="">Little planet</a>
        </div>
        <div>
            <a>Free shopping on $35+ Orders</a>
        </div>
        <div id="all">
            <a href="#"><i class="fa-solid fa-circle-user"></i></i> Hi,${name}</a>
            <a href="#"><i class="fa-regular fa-heart"></i> Hearts</a>
            <a href="./orderpage.html"><i class="fa-solid fa-box"></i> Orders</a>
            <a href="./cart.html"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
        `
    }else{
        child1.innerHTML = `
        <div>
            <a href="#">Baby's Fashion</a>
            <a href="#">OshKOsh</a>
            <a href="">Little planet</a>
        </div>
        <div>
            <a>Free shopping on $35+ Orders</a>
        </div>
        <div id="all">
            <a href="./login.html"><i class="fa-solid fa-user"></i> Sign in</a>
            <a href="#"><i class="fa-regular fa-heart"></i> Hearts</a>
            <a href="./login.html"><i class="fa-solid fa-box"></i> Orders</a>
            <a href="./login.html"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>    `
    }

    child2.innerHTML=`
            <div>
                <a href="./index.html"><img src="./media/Baby's (2).png" alt=""></a>
            </div>
            <div id="allcategory">
                <div>
                    <h3>Baby</h3>
                    <p>PREEMIE-24M</p>
                </div>
                <div>
                    <h3>Toddler</h3>
                    <p>2T-5T</p>
                </div>
                <div>
                    <h3>Kid</h3>
                    <p>2T-5T</p>
                </div>
                <div>
                    <h3>Collection</h4>
                </div>
                <div>
                    <h3>Sale</h3>
                </div>
                
                
            </div>
            <div id="search">
                <input type="text" id="searchbox" placeholder="Find Your Product">
                <button id="searchbtn" style="border: none;"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
        `
       
        let searchBtn=document.getElementById("searchbtn")
        searchBtn.addEventListener("click",()=>{
            let serachData=document.getElementById("searchbox").value;

            sessionStorage.setItem("searchData",serachData)
            window.location.href="./searchpage.html"
        })
       
}
navbar()

async function products(){
     try {
        let res= await fetch("http://localhost:8080/products")
        let data=await res.json()
        console.log(data)
        display(data)
        
     } catch (error) {
        console.log(error);
     }
}
products()

function display(data){
    let products=document.getElementById("first-five")
    let end=document.getElementById("second-five")
        let bag=[]
        for(let i=0;i<5;i++){
            bag.push(data[i])
        }
     
        products.innerHTML=`
         ${bag.map((item)=>{
              return `
                <div>
                    <img src="${item.image1}" alt="">
                    <hr>
                    <div id="price">
                        <h3>${item.price}</h3>
                        <button><i class="fa-regular fa-heart"></i></button>
                    </div>
                    <p id="mrp">${item.MRP}</p>
                    <p>${item.name}</p>
                    <p>${item.productfor}</p>
                </div>
              `
         })}
        `
       
        let bag2=[]
        for(let i=10;i<15;i++){
            bag2.push(data[i])
        }
      
        end.innerHTML=`
        ${bag2.map((item)=>{
             return `
               <div>
                   <img src="${item.image1}" alt="">
                   <hr>
                   <div id="price">
                       <h3>${item.price}</h3>
                       <button><i class="fa-regular fa-heart"></i></button>
                   </div>
                   <p id="mrp">${item.MRP}</p>
                   <p>${item.name}</p>
                   <p>${item.productfor}</p>
               </div>
             `
        })}
       `
    
}


export default navbar()

