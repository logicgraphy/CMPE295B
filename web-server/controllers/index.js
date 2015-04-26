function controllers(params) {    
    var mongoose = params.mongoose;      
    var products = mongoose.model('products');
    controllers.index = function (req, res) {  	
		
		res.render('index');	
	};
	
    return controllers;
};

module.exports = controllers;