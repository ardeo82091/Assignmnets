function Fibonnaci(upperLimit)
{
    var fib1=0;
    var fib2=1;
    var tempNumber=0;
    var sum= fib1;
    while(fib2<upperLimit)
    {
        sum+=fib2;
        tempNumber=fib1;
        fib1=fib2;
        fib2=tempNumber+fib1;
    }
console.log(sum);

}