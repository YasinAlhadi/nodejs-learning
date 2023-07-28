const { Router } = require("express")

const router = Router();

router.use((req, res, next) => {
    if (req.session.user) next();
    else res.sendStatus(401);
});

const branchesList = [
    {
        id: 1,
        addree: "Muscat",
        dest: 2.0,
    },
    {
        id: 2,
        addree: "Muscat",
        dest: 2.5,
    },
    {
        id: 3,
        addree: "Salah",
        dest: 3.0,
    },
    {
        id: 4,
        addree: "Muscat",
        dest: 4.2,
    },
];


router.get('', (req, res) => {
    const { dest } = req.query;
    const parseDest = parseInt(dest);
    if (!isNaN(parseDest)) {
        const filterBranches = branchesList.filter((b) => b.dest <= parseDest);
        res.end(filterBranches);
     } else res.send(branchesList);
});

module.exports = router;