
const { Book, Review } = require('./book.model');

const randomName = function () {
    const firstName = ['Sanjay', 'Kedar', 'Jaya', 'Soumya', 'Shurti', 'Naveen', 'Rakesh', 'Sanjeev'];
    const lastName = ['Shah', 'Kumar', 'Ranjan', 'Gupta', 'Chaudhuri', 'Patil', 'Kumar', 'Sharma'];

    const randomIndex = Math.floor(Math.random() * firstName.length);
    const randomIndex1 = Math.floor(Math.random() * lastName.length);
    return `${firstName[randomIndex]} ${lastName[randomIndex1]}`;
}

const randomReview = function (title, author, rating) {
    const titlePrefixes = [
        [],
        ["Terrible", "Time Waste", "Crap", "Worst", "Nonsense"], //1
        ["Avoid", "Not worth your time", "Lame Story", "Childish"], //2
        ["Poor", "Below Average", "Average", "Time Pass", "One Time Read"], //3
        ["Good", "Above Average", "Excellent", "Worth a Read"], //4
        ["Outstanding", "Superb", "Fantastic", "Must Read", "One of My Most Favorite"] //5
    ]

    //select a random title based on rating
    const titlePrefix = titlePrefixes[Math.min(rating, 5)];
    const randomTitle = titlePrefix[Math.floor(Math.random() * titlePrefix.length)];

    //create a random description randomly including book title, review title and author name
    const descriptionTemplates = [
        [],
        //rating 1
        ["The book $$title$$ was a terrible and time wasting. I don't recommend it.",
            "I was disappointed by $$author$$. Will never read his book again.",
            "I left the book midway. If you ask me $$reviewTitle$$ ",
            "This book is not worth your time. It's a waste of time.",
            "$$title$$ by $$author$$ is a nonsense. $$reviewTitle$$."],

        //rating 2
        ["$$title$$ by $$author$$ is a poorly written with lot of mistakes. $$reviewTitle$$.",
            "I disliked $$title$$ by $$author$$. Will never read it again.",
            "I found $title$ $reviewTitle$ and it was a waste of time.",
            "This book is not worth the time I spent reading it. I would never recommend it.",
            "$$title$$ by $$author$$ is a nonsense. $$reviewTitle$$."],
        //rating 3
        ["$$title$$ by $$author$$ is a average book. $$reviewTitle$$.",
            "I found $title$ $reviewTitle$ and it was a time pass.",
            "I enjoyed reading $title$ by $$author$$ but it was a waste of time.",
            "This book is not worth the time I spent reading it. I would never recommend it.",
            "$$title$$ by $$author$$ is a nonsense. $$reviewTitle$$."],
        //rating 4
        ["$$title$$ by $$author$$ is a great book. $$reviewTitle$$.",
            "$$title$$ by $$author$$ is an outstanding read. $$reviewTitle$$.",
            "$$title$$ by $$author$$ is a must read. $$reviewTitle$$.",
            "I absolutely loved $$title$$ by $$author$$. $$reviewTitle$$.",
            "I can't wait to read more of $$title$$ by $$author$$. $$reviewTitle$$."
        ],
        //rating 5
        ["$$title$$ by $$author$$ is an amazing book. $$reviewTitle$$.",
            "$$title$$ by $$author$$ is a fantastic read. $$reviewTitle$$.",
            "$$title$$ by $$author$$ is a must read. $$reviewTitle$$.",
            "I absolutely loved $$title$$ by $$author$$. $$reviewTitle$$.",
            "I can't wait to read more books by $$author$$. $$reviewTitle$$."
        ]
    ]


    //create reandom description by replacing $$variables$$ with required values
    //without using regex
    let randomDescription = descriptionTemplates[Math.min(rating, 5)][Math.floor(Math.random() * descriptionTemplates[Math.min(rating, 5)].length)];

    randomDescription = randomDescription
        .replace("$$title$$", title)
        .replace("$$author$$", author)
        .replace("$$reviewTitle$$", randomTitle);

    return {
        name: randomName(),
        rating: rating,
        title: randomTitle,
        details: randomDescription,
    }
}

class SeederService {

    async seedReview(count) {

        //fetch all books
        const books = await Book.find({});
        const reviews = [];
        if(books.length === 0){
            return []
        }

        for (let i = 0; i < count; i++) {
            //select a random book
            const book = books[Math.floor(Math.random() * books.length)];

            //create a random review for the book
            const review = randomReview(book.title, book.author, Math.floor(Math.random() * 5) + 1);

            reviews.push(review)
            //update the book by pushing the review
            await Book.updateOne(
                { id: book.id, reviews: { $exists: false } },
                { $set: { reviews: [] } }
            );

            // Push the new review
            await Book.updateOne(
                { id: book.id },
                { $push: { reviews: review } }
            );


            //add the review to the book
            //const newReview = new Review(review);
            //await book.reviews.push(review);
            //await newReview.save();
            //await book.save();
            return reviews;

        }


    }
}

module.exports = {
    SeederService,

}