const router = require("express").Router();
const db = require("../../models");

router.get("/", async (req, res) => {
    try{
        const workoutData = await db.Workout.find({});
        res.status(200).json(workoutData);
    } catch (err) {
        res.status(500).json(err);
    }
    
});
