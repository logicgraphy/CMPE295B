exports.setup = function(params) {
    var app = params.app;
    var controllers = params.controllers;

    // Routes
    app.get('/', controllers.index);  
	app.get('/review_trend_gender', controllers.review_trend_gender); 
	app.get('/review_trend_category', controllers.review_trend_category); 
	app.get('/score_vs_sentiment', controllers.score_vs_sentiment);
};
