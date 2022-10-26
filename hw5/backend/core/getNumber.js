var number;
const genNumber=()=>{
    number= Math.floor(Math.random() * 99)+1 //0~100
    console.log(number)
    return 
}

const getNumber=()=>{
    return number
}

export {genNumber,getNumber}