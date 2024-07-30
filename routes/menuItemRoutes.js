const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// Saving the menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body; //assuming the request body contains the menuItem data
        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            erro: 'Internal server error'
        });
    }
})

// Fetching the menu item
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status().json({
            err: 'Internal server error'
        });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // extract the worktype from the URL parameter
        if (workType == 'sweet' || workType == 'spicy' || workType == 'sour') {
            const response = await MenuItem.find({
                taste: workType
            });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({
                error: 'Invalid work type'
            });
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

// Updating the Menu item
router.put('/:id',async(req,res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenuId = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuId,{
           new:true,
           runValidators:true,
        })
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('Data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

// Deleting the Menu item
router.delete('/:id', async (req,res)=>{
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error: 'Menu item not found'});
        }
        console.log('Menu item deleted');
        res.status(200).json({message:'Menu item deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})


module.exports = router;