function controllers(params) {    
    var mongoose = params.mongoose;      
    var products = mongoose.model('products');
    controllers.index = function (req, res) {  	
		res.render('index', {'chart_title': 'Popular Brands', 'chart_subtitle': 'by number of reviews'});	
	};
	
    controllers.review_trend_gender = function (req, res) {  	
		res.render('review_trend_gender', {'chart_title': 'Gender Comparison', 'chart_subtitle': 'by number of reviews per category'});	
	};
	
    controllers.review_trend_category = function (req, res) {  	
		res.render('review_trend_category', {'chart_title': 'Categories Review Trend', 'chart_subtitle': 'by number of reviews per year'});	
	};
	
    controllers.score_vs_sentiment = function (req, res) {  	
		res.render('score_vs_sentiment', {'chart_title': 'Ratings Vs Sentiments', 'chart_subtitle': 'by average per category'});	
	};
	
	
    return controllers;
};

module.exports = controllers;