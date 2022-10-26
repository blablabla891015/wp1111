import express from 'express'
import {genNumber,getNumber,computerGuess,updateMax,updateMin} from '../core/getNumber'


const router=express.Router()
router.post('/start',(_,res)=>{
    genNumber()
    res.json({msg:'The game has started'})
})
router.get('/guess',(req,res)=>{
    let the_number=getNumber()
    
    let guess_number=req.query.number
    if(guess_number>0 && guess_number<101){
        if(the_number>guess_number){
            // let com_guess=computerGuess()
            updateMin(guess_number)
            let com_guess=computerGuess()
            if(com_guess===the_number){
                res.json({msg:'computer win'})
            }
            else{
                res.json({msg:'Bigger !'+com_guess.toString()})
            }
        }
        else if(the_number<guess_number){
            // let com_guess=computerGuess()
            updateMax(guess_number)
            let com_guess=computerGuess()
            if(com_guess===the_number){
                res.json({msg:'computer win'})
            }
            else{
                res.json({msg:'Smaller !'+com_guess.toString()})
            }
        }
        else{
            res.json({msg:'Equal'})
        }
    }
    else{
        res.status(406).send({ msg:'Not a legal number.'})
        res.json({msg:'Not a legal number.'})
    }
})
router.post('/restart',(_,res)=>{
    genNumber()
    res.json({msg:'The game has restarted'})
})
export default router