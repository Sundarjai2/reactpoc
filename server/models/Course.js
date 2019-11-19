var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  id: String,
  name: String,
//   course: String,
  course:String,
// course:[
//     {type: Schema.Types.ObjectId, ref: 'Course'}
//   ],
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);
