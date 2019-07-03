const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');



router.get('/', (req, res) => {
    // YOUR CODE HERE
    pool.query(``)
    .then((result)=>{
        console.log(result.rows)
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error in /get',error)
        res.sendStatus(500)
    })
});

router.get('/autoFill', (req, res) => {
    const searchString = req.query.string+'%'
    console.log('req.query',req.query.string)
    pool.query(`select * from "physical_cards" where "card_name" Ilike $1;`,[searchString])
    .then((result)=>{
        console.log(result.rows)
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error in /get',error)
        res.sendStatus(500)
    })
});

module.exports = router;