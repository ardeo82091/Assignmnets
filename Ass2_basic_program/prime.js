function isPrime(numberToBeChecked)
{
    let not_prime =1;
    if(numberToBeChecked<0 || numberToBeChecked==0 || numberToBeChecked ==1) console.log("Enter a no. greater than 1. Because 2 is a smallest prime number");
    else{
        for(let i=2; i<numberToBeChecked; i++)
        {
            if(numberToBeChecked%i==0) not_prime=0;
        }
}
if(not_prime==0) console.log(false);
else console.log(true);
}

