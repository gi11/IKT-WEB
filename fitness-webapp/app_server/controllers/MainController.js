module.exports.home = function(req, res) {
    res.render('home', {
        title: "Home",
        user : req.user
    });
};

module.exports.about = function(req, res){
    res.render('about', {
        title: "About",
        user: req.user
    });
}

module.exports.profile = function(req, res){
    res.render('profile', {
        title: "Profile",
        user: req.user
    });
}