const router = require('express').Router();
const { User, Thought } = require("../../models");

router.get("/", (req, res) => {
    User.find({})
        .populate({
            path: 'thoguhts',
            select: '-__v'
        })
        .select('-__v')
        .then((data) =>
            res.json(data))
        .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
    User.findOne({ _id: req.params.id })
        .populate({
            path: 'thoguhts',
            select: '-__v'
        })
        .select('-__v')
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            };
            res.json(data)
        })
        .catch(err => res.json(err));
});

router.post("/", ({ body }, res) => {
    User.create(body)
        .then((data) => res.json(data))
        .catch(err => res.json(err));
});

router.put("/:id", ({ body, params }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(data)
        })
        .catch(err => res.json(err));
});

router.delete("/:id", async ({ params }, res) => {
    const user = await User.findById(params.id);
    const thoughts = user.thoughts;

    thoughts.forEach((id) => {
        Thought.findOneAndUpdate({ _id: id }).catch((err) => {
            if (err) throw err
        })
    });

    User.findOneAndDelete({ _id: params.id })
        .then(() => {
            res.json({ message: "The user and Thoughts has been deleted" });
        })
        .catch((err) => res.json(err));
});

router.post("/:userId/friends", ({ params, body}, res) => {
User.findOneAndUpdate(
    { _id: params.userId },
    {$push: { friends: body.id }},
    {new: true})
    .then((data) => {
        if (!data) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(data)}).catch((err) => res.json(err));
});

router.delete("/:userId/friends/:friendId", (req, res) => {

    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true })
        .then(data => res.json(data))
        .catch((err) => {if (err) throw err});
});

module.exports = router;