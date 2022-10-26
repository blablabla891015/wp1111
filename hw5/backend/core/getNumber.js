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
    return number
}
const computerGuess=()=>{
    console.log('max is'+max.toString())
    console.log('min is'+min.toString())
    let res=Math.floor(Math.random()*(max - min)+min)
    console.log(res)
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