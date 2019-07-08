const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');



router.get('/active_orders', (req, res) => {
    // YOUR CODE HERE
    pool.query(`
    select "all-sale-trans"."order_ID","all-sale-trans"."total","all-sale-trans"."sales_date", "physical_cards"."card_name", "user"."username" from "all-sale-trans" 
    join "physical_cards" on "all-sale-trans"."card_id" = "physical_cards"."id"
    join "user" on "all-sale-trans"."customer" = "user"."id"
    where "active" = true;`)
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

router.post('/add_order', (req,res)=>{
    const data = req.body.payload
    console.log(req.body)
    pool.query(`insert into "all-sale-trans" ("customer", "card_id", "sales_date", "total", "paid", "active", "order_ID")
    values ($1,$2,$3,$4,$5,$6,$7)`,[data.customer,data.card_id,data.sales_data,data.total,data.paid,data.active,data.order_ID])
    .then(()=>{
        res.sendStatus(201)
    }).catch((error)=>{
        console.log('error in add_order',error)
        res.sendStatus(500)
    })
})

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! card edit page!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
router.put('/card_add',(req,res)=>{
    pool.query(`insert into "physical_cards" ("card_name","set") values ($1,$2);`,[req.body.payload1,req.body.payload2])
    .then(()=>{
        res.sendStatus(201)
    }).catch((error)=>{
        console.log('error in card_add',error)
        res.sendStatus(error)
    })
})
//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! card edit page!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// add delete route for orders aka deactivate
router.put('/deactivate', (req, res) => {
    console.log(req.body.payload)
    pool.query(`
    update "all-sale-trans" 
    set "active" = false
    where "order_ID" = $1;
    `,[req.body.payload])
    .then(()=>{
        res.sendStatus(200)
    }).catch((error)=>{
        console.log('error in deactivate',error)
        res.sendStatus(500)
    })
});


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ genorates new order numbers @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
router.get('/order_IDs', (req, res) => {
    pool.query(`INSERT INTO "public"."order_IDs" VALUES(DEFAULT) RETURNING "id";`)
    .then((result)=>{
        console.log(result.rows)
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error in /get_order_IDs',error)
        res.sendStatus(500)
    })
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ genorates new order numbers @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


module.exports = router;