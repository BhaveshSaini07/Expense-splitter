let personName= document.getElementById("personName");
let addPerson= document.querySelector(".add-person");
let peoples = document.getElementById("people-list");
let paidPerson = document.getElementById("paidBy");
let foodName=document.getElementById("foodName");
let foodAmount=document.getElementById("foodAmount");
let addExpense = document.querySelector(".add-expense");
let expenselist=document.getElementById("expense-list");
let calculateBtn = document.querySelector(".calculate");
let resultDiv = document.querySelector(".result");
const people=[];
const expenses=[];
addPerson.addEventListener("click",addPeople);
function addPeople(){
let name=personName.value.trim();
if(name===""){
alert("plz enter the name");
personName.value="";
return;
}
people.push({
    name: name,
    ID: Date.now(),
})
let person = document.createElement("li");
person.textContent=name;
peoples.appendChild(person);
let option = document.createElement("option")
option.value=name;
option.innerText=name;
paidPerson.appendChild(option);
personName.value="";
};
addExpense.addEventListener("click",addExpenses);
function addExpenses(){
let fName=foodName.value.trim();
let amount=foodAmount.value;
let pP=paidPerson.value;
if(fName===""){
    alert("enter the correct name")
    foodName.value="";
    return;
}
if(amount===""||isNaN(amount)){
alert("Only number value is accepted")
foodAmount.value=null;
return;
}
if(pP===""){
    alert("plz select the person")
    return;
}
expenses.push({
    food: fName,
    amount: amount,
    paidBy: pP,
})
let expenseItem = document.createElement("li");
expenseItem.textContent=`${fName} ₹ ${amount} was paid by ${pP}`;
expenselist.appendChild(expenseItem);
foodName.value="";
foodAmount.value="";
pP.value="";
}
calculateBtn.addEventListener("click", calculateSpilit);
function calculateSpilit(){
     let balances =[];
    let totalExpense=0;
    for(let i=0; i<expenses.length; i++){
        totalExpense += expenses[i].amount;
    }
    let fairShare= totalExpense/people.length;
    for(let i=0; i<people.length; i++){
    let exp=expenses.filter(exp => exp.paidBy === people[i].name);
   const paid = exp.reduce((acc,curr)=>{
    return acc+curr.amount;
},0);
  let balance = paid-fairShare;
  balances.push({
    name: people[i].name,
    balance: balance
  });
    }
    resultDiv.innerHTML="";
for(let i =0; i<balances.length; i++){
    let p = document.createElement("p");
    if(balances[i].balance>0){
    p.textContent=`${balances[i].name} get ₹${balances[i].balance}`;
    }
    else{
       p.textContent=`${balances[i].name} owes ₹${balances[i].balance}`; 
    }
    resultDiv.appendChild(p);
}
}    

let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", resetAll);

function resetAll() {
    people.length = 0;
    expenses.length = 0;
    
    peoples.innerHTML = "";
    expenselist.innerHTML = "";
    resultDiv.innerHTML = "";
    paidPerson.innerHTML = "";
}
