const base_url ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button")
const Fromcurr=document.querySelector(".from select");
const Tocurr=document.querySelector(".to select");
const message=document.querySelector(".mssg");

window.addEventListener("load",()=>
    {
updateRate();
    })
for(let select of dropdown)
{
    for(code in countrylist)
{
    const newoption=document.createElement("option");
    newoption.innerText=code;
    newoption.value=code;
    if(select.name==="From" && code==="USD")
    {
        newoption.selected="selected";
    }
    else if(select.name==="To" && code==="INR")
    {
        newoption.selected="selected";
    }
    select.append(newoption);
}  
select.addEventListener("click", (evt)=>
{
    updateflag(evt.target)
});     
}

function updateflag(evt)
{
let code=evt.value;
let countrycode=countrylist[code];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let newimg=evt.parentElement.querySelector("img");
newimg.src=newsrc;
}
btn.addEventListener("click",async (evt)=>
{
evt.preventDefault();
updateRate();
});

async function updateRate()
{
    
let amount=document.querySelector(".amount input");
let amtval=amount.value;
if(amtval===" " || amtval<1)
{
    amtval=1;
    amount.value="1";
}
const url=`${base_url}/${Fromcurr.value.toLowerCase()}/${Tocurr.value.toLowerCase()}.json`;
let response= await fetch(url);
// console.log(response)
let data=await response.json();
// console.log(data)
let rate=data[Tocurr.value.toLowerCase()];
// console.log(rate)
let finalamt=amtval*rate;
// console.log(finalamt)
message.innerText=`${amtval}${Fromcurr.value}=${finalamt}${Tocurr.value}`;
}
