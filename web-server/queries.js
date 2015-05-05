//total number of reviews
db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: {
        _id: '',
        count: { $sum: 1 }}},
])

//total number of users
db.products.aggregate([
    { $unwind : "$reviews" },
    { $group: { _id: '$reviews.user_id'}},
    { $group: {_id: 1, count: { $sum: 1 }}},
])


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

//Top product by brand, avg sentiments, per year
db.products.aggregate([
    { $unwind : "$reviews" },
	{$match: {'brand' : {$eq : "JanSport"}}},
    { $group: {
        _id: {$year: "$reviews.date"},
		avgSentiment: { $avg: "$reviews.sentiment" }}},
    {$sort:{"_id": 1}}
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
	{$match: {'category' : "Watches"}},
    { $group: {
        _id: {product: "$_id"},
        count: { $sum: 1 }}},
	{$sort:{"count": -1}},
		{$limit: 2}
])


db.products.aggregate([
    { $unwind : "$reviews" },
	{$match: {'_id' : {$in : ["B000JQM1DE",
"B0000CBK1L",
"B000CITK8S",
"B00068XCQU",
"B00009WO07",
"B00026442M",
"B0009V1YR8",
"B0000YUXI0",
"B000NZW3KC",
"B000A0PVV8",
"B0002L5R78",
"B000LRMS66",
"B00032G1S0",
"B000FEH8NI",
"B000GLRREU",
"B000KUHFGM",
"B000071NUS",
"B000HCNEWM",
"B0002M7SPG",
"B000EITEQO",
"B000HCZ8EO",
"B00006ULHT",
"B0000U1OCI",
"B000FN7UWS",
"B000FKBCX4",
"B000NDRT62",
"B000EQS1JW",
"B000GAYQKY"]}}},
    { $group: {
        _id: {category: "$category", title: "$title", gender: '$reviews.user_gender'},
        avgSentiment: { $avg: "$reviews.sentiment" },
		count: { $sum: 1 }}},
{$sort:{"_id.category": 1, "_id.title" : 1}},		
])

	"Arts",
	"Automotive",
	"Baby",
	"Beauty",
	"Clothing_&_Accessories",
	"Electronics",
	"Gourmet_Foods",
	"Health",
	"Patio",
	"Shoes",
	"Software",
	"Sports_&_Outdoors",
	"Video_Games",
	"Watches"



   
   
   
   
   
   
   
   

