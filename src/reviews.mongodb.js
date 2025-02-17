use('brillio_books')


db.books.aggregate([
    {
        $project:{
            id:1,
            title:1,
            reviews:1
        }
    },
    {
        $unwind:"$reviews"
    },
    {
        $group:{
            _id: "$id",
           //review count
           reviews_count:{$sum:1},
           //add all reviews
           reviews:{$push:"$reviews"}
        }
    },{
        $sort:{
            reviews_count:-1
        }
    }
])