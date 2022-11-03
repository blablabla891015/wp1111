import { Router } from "express";
import ScoreCard from "./Card";
import mongoose from "mongoose";
const db = mongoose.connection
db.once("open", async () => {
    // await saveScoreCard(57, "Ric",'math',100);
    // await deleteDB()
    console.log('check')
   });
const router = Router();
router.delete("/cards", (req,res)=>{
    deleteDB()
    res.json({message:'Database cleared'})
    
});
router.post("/card", async(req,res)=>{
    let name=req.body.name
    let subject=req.body.subject
    let score=req.body.score
    const existing=await ScoreCard.findOne({name:name,subject:subject})
    if (existing){
        await ScoreCard.findOneAndUpdate({name:name,subject:subject},{score:score})
        res.json({message:"updating:("+ name+' , '+subject+' , '+score+')',card:true})

        
    }
    else{
        try{
            await saveScoreCard( name,subject,score);
            res.json({message:"adding name, Subject, Score)",card:true})}
        catch(e){
            console.log(e)
        }

    }
});
router.get('/cards', async(req,res)=>{
    try{
        let type=req.query.type
        let queryString=req.query.queryString
        console.log(type)
        if(type==="name"){
            const query_list=await ScoreCard.find({name:queryString})
            const messages=[]
            for(let i=0;i<query_list.length;i++){
                messages.push('Find card with name:( '+query_list[i]['name'].toString()+" , "+query_list[i]['subject'].toString()+' , '+query_list[i]['score'].toString()+')')
            }
            if(messages.length===0){
                res.json({messages:[type+'('+queryString+') not found!'],message:true})
            }
            res.json({messages:messages,message:true})
        }
        else if(type==='subject'){
            const query_list=await ScoreCard.find({subject:queryString})
            const messages=[]
            for(let i=0;i<query_list.length;i++){
                messages.push('Find card with subject:( '+query_list[i]['name'].toString()+" , "+query_list[i]['subject'].toString()+' , '+query_list[i]['score'].toString()+')')
            }
            res.json({messages:messages,message:true})
        }
    }
    catch(e){

    }
})

const saveScoreCard=(name,subject,score)=>{
    try {
        const newScoreCard = new ScoreCard({ name ,subject,score});
        // console.log("Created user", newUser);
        return newScoreCard.save();
    } catch (e) { throw new Error("User creation error: " + e); }

}
const deleteDB = async () => {
    try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
   };
export default router;
