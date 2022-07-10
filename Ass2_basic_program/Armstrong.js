function isAmstrong(upperLimit)
{
    let numberToBeChecked;
for(let i=0; i<upperLimit; i++)
{
    let countOfDigits=0;
    numberToBeChecked=i;
    while(numberToBeChecked>0)
    {
        countOfDigits++;
        numberToBeChecked = ~~(numberToBeChecked/10);
    }
    //console.log(countOfDigits,numberToBeChecked);
    numberToBeChecked=i;
    let armstrongToBeChecked=0;
    while(numberToBeChecked>0)
    {
        let digit = numberToBeChecked % 10;
        armstrongToBeChecked = armstrongToBeChecked + Math.pow(digit, countOfDigits);
       // console.log(armstrongToBeChecked,countOfDigits);
        numberToBeChecked = ~~(numberToBeChecked/10);
    }
    if(armstrongToBeChecked == i) {
        console.log(i);
    }
}
}