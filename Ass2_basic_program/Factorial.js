function FactorialOf(numberToBeFactorial)
{
    if(numberToBeFactorial<0) 
    console.log("Please enter a postive numberToBeFactorial");
    else if(numberToBeFactorial==0)
    console.log("The factorial of 0 is 1");
    else if(numberToBeFactorial>0)
    {
        let factorial=1;
        for(i=1; i<=numberToBeFactorial; i++)
        {
            factorial*=i;
        }
        console.log(`The factorial of ${numberToBeFactorial} is ${factorial}.`)
    }

}

