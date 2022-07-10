const arr_len = prompt("Enter the length of an array");
let arr = [];
let even=0;
let odd=0;
let zero=0;
for(let i=0; i<arr_len; i++)
{
    arr[i] = prompt("Enter elements of an array");
}
for(let i=0; i<arr_len; i++)
{
    if(arr[i]==0)
    zero++;
    else if(arr[i]%2==1)
    odd++;
    else if(arr[i]%2==0)
    even++;
}
console.log(`The count of even number is ${even}`);
console.log(`The count of odd number is ${odd}`);
console.log(`The count of zero number is ${zero}`);