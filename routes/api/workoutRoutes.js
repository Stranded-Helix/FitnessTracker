const router = require("express").Router();
const db = require("../../models");

router.get("/", async (req, res) => {
    try{
        const workoutData = await db.Workout.aggregate([{
            $addFields: {
            totalDuration: {$sum: '$exercises.duration'},
            totalDistance: {$sum: '$exercises.distance'}},
        }]);
        res.status(200).json(workoutData);
    } catch (err) {
        res.status(500).json(err);
    }
    
});

router.put('/:id', async (req , res) => {
    try {
        const workout = await db.Workout.findOneAndUpdate(
            { _id: req.params.id },{ $push:  { exercises: req.body } }, { runValidators: true }
        )

        res.status(200).json(workout)
    }   catch (err) {
        res.status(400).json(err)
    } 
})

router.post("/", async (req, res) => {
    try {
        const newWorkout = await db.Workout.create(req.body);
        res.json(newWorkout);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/range", async (req, res) => {
    try{
        const workoutData = await db.Workout.aggregate([{
            $addFields: {totalDuration: {$sum: '$exercises.duration'}}
        }]);
        if(workoutData.length > 7) {
            workoutData.splice(0, workoutData.length - 7);
        }
        res.json(workoutData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;