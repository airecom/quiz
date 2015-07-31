// GET /quizes/author
exports.author = function(req, res) {
   res.render('author', {autor: 'airecom', errors: []});
};