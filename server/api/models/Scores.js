const { init } = require ('../dbConfig')
// const { ObjectId } = require('mongodb')

class Score {
    constructor(data){
    this.id = data.id
    this.username = data.username
    this.category = data.category
    this.difficulty = data.difficulty
    this.score = data.score
}

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const scoreData = await db.collection('scores').find().toArray();
                const scores = scoreData.map(s => new Score({ ...s, id: s._id }))
                resolve(scores);
            } catch (err) {
                reject("Error getting scores")
            }
        })
    }

    // static create(score){
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             const db = await init();
    //             let scoreData = await db.collection('scores').insertOne(score)
    //             let newScore = new Score({...score, id:scoreData.insertedId});
    //             resolve (newScore);
    //         } catch (err) {
    //             reject('Error adding new score');
    //         }
    //     });
    // }
    // insert Many
    static create(scores){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let scoresData = await db.collection('scores').insertMany(scores)
                console.log(scoresData);
                let newScores = scoresData.map((s,i)=>new Score({...scores[i], id:s.insertedId}));
                resolve (newScores);
            } catch (err) {
                reject('Error adding new scores');
            }
        });
    }
}


module.exports = Score;