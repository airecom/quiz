var models = require('../models/models.js');

// Autoload - factoriza el cÃ³digo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {

  //búsqueda
  var inputValueSearch = (req.query.search || "texto_a_buscar");
  var search = '%';
  
  if(req.query.search) {
      search=search+req.query.search+'%';
      search=search.replace(/\s+/g,'%');
  }
  models.Quiz.findAll(
    { where: ["lower(pregunta) like lower(?)",search],
      order: 'pregunta ASC'
    } 
  ).then(function(quizes){
    res.render('quizes/index',{quizes: quizes, search: inputValueSearch});
  }).catch(function(error){next(error);});
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};