const mongoose = require('mongoose');
const Schemas = require('./schema');

mongoose.connect('mongodb://localhost/qna', { useNewUrlParser: true, useUnifiedTopology: true });

const Question = mongoose.model('Question', Schemas.QnaSchema);

const getQuestions = () => (// implicit return
  Question.find()
    .then((questions) => (questions)) // implicit return
    .catch((err) => {
      console.error('Error getting questions db line 17', err);
    })
);

const addQuestion = (id, addObj) => {
  // console.log(
  //   'id= ', id,
  //   'addObj= ', addObj,
  // );
  const questObj = {
    product_id: id,
    question_body: addObj.quesbdy,
    asker_name: addObj.quesnname,
    asker_email: addObj.quesemail,
  };
  // console.log('question', questObj);
  const newQuest = new Question(questObj);
  return newQuest.save()
    .then(() => ('Question added successfully'))
    .catch((err) => console.error('Error adding question to database', err));
};

const addAnswer = (id, addAnsObj) => {
  // console.log(
  //   'id= ', id,
  //   'addObj= ', addAnsObj,
  // );
  const filter = { _id: id };
  const ansId = Math.floor(Math.random() * 1000000000);
  // may need to create photos array here?
  const update = {
    id: ansId,
    body: addAnsObj.ansbdy,
    answerer_name: addAnsObj.ansnname,
    answerer_email: addAnsObj.ansemail,
    photos: [],
  };
  return Question.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  });
};

module.exports = {
  getQuestions,
  addQuestion,
  addAnswer,
};
