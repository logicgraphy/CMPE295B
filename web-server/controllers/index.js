function controllers(params) {    
    var mongoose = params.mongoose;      
    var products = mongoose.model('products');
    controllers.index = function (req, res) {  	
		
		res.render('index', {'chart_title': 'Popular Brands', 'chart_subtitle': 'by number of reviews'});	
	};
	
    return controllers;
};

module.exports = controllers;