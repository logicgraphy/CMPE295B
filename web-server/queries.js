//Count products per brand
db.products.aggregate([{$group:{"_id" : "$brand", count: {$sum:1}}}, {$sort : {count : -1}}])

//Date query example
db.products.find({"reviews.date" : { $gte : new ISODate("2013-10-01T00:00:00Z")}})

db.products.find({$and: [{category: "Patio"}, {"reviews.user_gender": "male"}] }).count()

//reviews per category per gender
db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: {
        _id: {category: "$category", gender: '$reviews.user_gender'},
        count: { $sum: 1 }}},
	{$sort:{"_id.category": 1}}
])

//Brands word cloud
db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: {
        _id: {key: "$brand"},
        value: { $sum: 1 }}},
	{$sort:{"value": -1}}
])

//Top product by category, number of reviews, per year
db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: {
        _id: {category: "$category", date: {$year: "$reviews.date"}},
        count: { $sum: 1 }}},
    {$sort:{"_id.category": 1, "_id.date" : 1}}
])

// Get avg score & avg sentiment per category.
db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: {
        _id: {category: "$category"},
        avgScore: { $avg: "$reviews.score" }}},
	{$sort:{"_id.category": 1}}
])

db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: {
        _id: {category: "$category"},
        avgSentiment: { $avg: { $multiply: [ "$reviews.sentiment", 100 ] }}}},
	{$sort:{"_id.category": 1}}
])

db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: {
        _id: "$category",
        avgScore: { $avg: "$reviews.score" },
		avgSentiment: { $avg: "$reviews.sentiment" }},
	{$sort:{"_id.category": 1}}
])

//Top 20 products - avg sentiment by gender
db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: {db.products.aggregate([
    { $unwind : "$reviews" },
	{$match: {'_id' : "B000NWS3SG"}},
    { $group: {
        _id: {title: "$title", gender: '$reviews.user_gender'},
        avgSentiment: { $avg: "$reviews.sentiment" },
		count: { $sum: 1 }}},
])
        _id: {product: "$_id"},
        count: { $sum: 1 }}},
	{$sort:{"count": -1}},
		{$limit: 25}
])

db.products.aggregate([
    { $unwind : "$reviews" },
	{$match: {'_id' : "B00009WO07"}},
    { $group: {
        _id: {title: "$title", gender: '$reviews.user_gender'},
        avgSentiment: { $avg: "$reviews.sentiment" },
		count: { $sum: 1 }}},
])

