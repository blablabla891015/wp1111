var number;
var max
var min
const genNumber=()=>{
    number= Math.floor(Math.random() * 99)+1 //0~100
    max=100
    min=1
    return
}

const getNumber=()=>{
    if(number===undefined){
        number= Math.floor(Math.random() * 99)+1 //0~100
        max=100
        min=1
    }
    console.log(number)
    return number
}
const computerGuess=()=>{
    let res=Math.floor(Math.random()*(max - min)+min)
    return res
}
const updateMax=(new_max)=>{
    if(new_max<max){
        max=parseInt(new_max)
    }
    return
}
const updateMin=(new_min)=>{
    if(new_min>min){
        min=parseInt(new_min)
    }
    return
}

export {genNumber,getNumber,computerGuess,updateMax,updateMin}