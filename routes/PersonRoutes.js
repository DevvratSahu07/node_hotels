const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const { message } = require('statuses');

// POST route to add a Person  
/* Adding data in the json form in body 
    {   
        "name": "Manish",
        "age": 12,
        "work": "waiter",
        "mobile": "332233",
        "email": "manish@exmaple.com",
        "address": "xyz",
        "salary": 23000
    }
*/
router.post('/', async (req, res)=>{
    try{
        const data = req.body;//assuming the request body contains the person data
        const newPerson = new Person(data);
        
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({erro:'Internal server error'});
    }
})

// Fetch/access the data
router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status().json({err:'Internal server error'});
    }
})

// localhost:3000/person/chef
router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;// extract the worktype from the URL parameter
        if(workType =='chef'|| workType =='waiter'|| workType =='manager' ){
            const response = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }


    }catch(err){
        console.log(err);
        res.status(500).json({error:'Interval server error'})
    }
})

// Update the person data localhost:3000/person/66a63bd9e23eb5eafbc992aa  (id)  along with json data {"name":"data to be changed"}
router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('Data updated');
        res.status(200).json(response);
        }
        catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        }
})

// Delete the person data localhost:3000/person/ id
router.delete('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('Person deleted');
        res.status(200).json({message:'Person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;