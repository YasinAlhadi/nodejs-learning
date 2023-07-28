const { Router } = require("express");

const router = Router();

const storeList = [
    {
    item: "ege",
    quantity: 2
},
{
    item: "milk",
    quantity: 2
},
];

router.use((req, res, next) => {
    if (req.session.user) next();
    else res.sendStatus(401);
});

router.get('/', (req, res) => {
    res.cookie("visited", true, {
        maxAge: 10000,
    });
    res.send(storeList);
});

router.get('/:item', (req, res) => {
    console.log(req.header.cookie)
    const { item } = req.params;
    const storeItem = storeList.find((i) => i.iteme === item);
    res.send(storeItem);
});


router.post('/', (req, res) => {
    console.log(req.body);
    storeList.push(req.body);
    res.send(201);
});

router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    console.log("cart");
    if (!cart) {
        res.send("You don't have cart");
    } else {
        res.send(cart);
    }
});

router.post('/shopping/cart/item', (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = { item, quantity};
    const { cart } = req.session;
    if (cart) {
        req.session.cart.items.push(cartItem);
    } else {
        req.session.cart = {
            items: [cartItem],
        };
    }
    res.sendStatus(201);
});

module.exports = router;