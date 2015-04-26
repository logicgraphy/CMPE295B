function models(params) {
	var mongoose = params.mongoose;	
	
    var	Schema = mongoose.Schema,
    	ObjectId = mongoose.Schema.ObjectId;
 
	/* Schema Definition */	
    var product = new Schema({
				  		  user_id:  String,
						  password: String,
						  activation_code: Number,
						  activation: Boolean,
						  first_name: String,
						  last_name: String,
						  skill: [{name: String}],
						  project: [{title: String, body: String}],
						  job_post: [{title: String, body: String, category: String, date: Date}],
						  reco: [{rating: Number, recommender: String, body: String, date: Date,}], 
						  date: { type: Date, default: Date.now },
						  img: { data: Buffer, contentType: String }
						});
mongoose.model('products', product);
};
module.exports = models;