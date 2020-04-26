module.exports = {
    ensureAuthenticated: function(req, res, next){
        console.log('google', req.googleuser)
        if(req.isAuthenticated()){
            next();
        }
        req.flash('error', 'Please Login in to view the map');
        res.redirect('/users/login');
    }
}