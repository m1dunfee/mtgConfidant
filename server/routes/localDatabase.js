const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');



router.get('/active_orders', (req, res) => {
    // YOUR CODE HERE
    pool.query(`select * from "all-sale-trans" where "active" = true;`)
    .then((result)=>{
        console.log(result.rows)
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error in /get active_orders',error)
        res.sendStatus(500)
    })
});

router.get('/autoFill', (req, res) => {
    const searchString = req.query.string+'%'
    console.log('req.query', searchString)
    pool.query(`select * from "physical_cards" where "card_name" Ilike $1;`,[searchString])
    .then((result)=>{
        console.log(result.rows)
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error in /get',error)
        res.sendStatus(500)
    })
});

router.put('/card_update_name', (req, res) => {
    console.log(req.body.payload1)
    pool.query(`update "physical_cards" set "card_name" = $1 where "id" = $2;`,[req.body.payload1,req.body.payload2])
    .then(()=>{
        res.sendStatus(200)
    }).catch((error)=>{
        console.log('error in /get',error)
        res.sendStatus(500)
    })
});


router.put('/card_update_set', (req, res) => {
    
    pool.query(`update "physical_cards" set "set" = $1 where "id" = $2;`,[req.body.payload1,req.body.payload2])
    .then(()=>{
        res.sendStatus(200)
    }).catch((error)=>{
        console.log('error in /get',error)
        res.sendStatus(500)
    })
});

router.delete('/card_delete',(req,res)=>{
    console.log('detele',req.body.card_id)
    pool.query('delete from "physical_cards" where "id" = $1;',[req.body.card_id])
    .then(()=>{
        res.sendStatus(200)
    }).catch((error)=>{
        console.log('error delete',error)
        res.sendStatus(500)
    })
    
})



module.exports = router;