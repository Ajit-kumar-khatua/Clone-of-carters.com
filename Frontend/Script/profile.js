import navbar from "./index.js"

let name=localStorage.getItem("name")

let left=document.getElementById("left")

left.innerHTML=`
<h1>${name}</h1>
<p><i class="fa-solid fa-gift"></i> Orders</p>
<p><i class="fa-regular fa-star"></i>Rewards</p>
<p><i class="fa-regular fa-face-kiss-wink-heart"></i>Kids</p>
<p><i class="fa-regular fa-heart"></i>Heart</p>
<p><i class="fa-solid fa-gear"></i>Setting</p>
<p id="logout"><i class="fa-solid fa-right-from-bracket"></i>Logout</p>
`

let logout=document.getElementById("logout")
logout.addEventListener("click",()=>{
    localStorage.clear()
    window.location.href="./index.html"
})