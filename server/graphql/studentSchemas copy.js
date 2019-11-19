var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var StudentModel = require('../models/Student');
var CourseModel = require('../models/Course');

var courseType = new GraphQLObjectType({
  name: 'course',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      courseId: {
        type: GraphQLID
      }
    }
  }
});

// var courseQueryType = new GraphQLObjectType({
//   name: 'Query',
//   fields: function () {
//     return {
//       courses: {
//         type: new GraphQLList(courseType),
//         resolve: function () {
//           const courses = CourseModel.find().exec()
//           if (!courses) {
//             throw new Error('Error')
//           }
//           return courses
//         }
//       },
//       course: {
//         type: courseType,
//         args: {
//           id: {
//             name: '_id',
//             type: GraphQLString
//           }
//         },
//         resolve: function (root, params) {
//           const courseDetails = CourseModel.findById(params.id).exec()
//           if (!courseDetails) {
//             throw new Error('Error')
//           }
//           return courseDetails
//         }
//       }
//     }
//   }
// });

var studentType = new GraphQLObjectType({
    name: 'student',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        },
        course: {
          type: GraphQLString
        },
        rollnumber: {
          type: GraphQLString
        },
        address: {
          type: GraphQLString
        },
        birth_year: {
          type: GraphQLInt
        },
        gender: {
          type: GraphQLString
        },
        updated_date: {
          type: GraphQLDate
        }
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        students: {
          type: new GraphQLList(studentType),
          resolve: function () {
            const students = StudentModel.find().exec()
            if (!students) {
              throw new Error('Error')
            }
            return students
          }
        },
        student: {
          type: studentType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const studentDetails = StudentModel.findById(params.id).exec()
            if (!studentDetails) {
              throw new Error('Error')
            }
            return studentDetails
          }
        },
        courses: {
          type: new GraphQLList(courseType),
          resolve: function () {
            const courses = CourseModel.find().exec()
            if (!courses) {
              throw new Error('Error')
            }
            return courses
          }
        },
        course: {
          type: courseType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const courseDetails = CourseModel.findById(params.id).exec()
            if (!courseDetails) {
              throw new Error('Error')
            }
            return courseDetails
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addStudent: {
          type: studentType,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            course: {
              type: new GraphQLNonNull(GraphQLString)
            },
            rollnumber: {
              type: new GraphQLNonNull(GraphQLString)
            },
            address: {
              type: new GraphQLNonNull(GraphQLString)
            },
            birth_year: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            gender: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const studentModel = new StudentModel(params);
            const newStudent = studentModel.save();
            if (!newStudent) {
              throw new Error('Error');
            }
            return newStudent
          }
        },
        addCourse: {
          type: courseType,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            course: {
              type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve: function (root, params) {
            const courseModel = new CourseModel(params);
            const newCourse = courseModel.save();
            if (!newCourse) {
              throw new Error('Error');
            }
            return newCourse
          }
        },
        updateStudent: {
          type: studentType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            course: {
              type: new GraphQLNonNull(GraphQLString)
            },
            rollnumber: {
              type: new GraphQLNonNull(GraphQLString)
            },
            address: {
              type: new GraphQLNonNull(GraphQLString)
            },
            birth_year: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            gender: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return StudentModel.findByIdAndUpdate(params.id, { name: params.name, course: params.course, rollnumber: params.rollnumber, address: params.address, birth_year: params.birth_year, gender: params.gender, updated_date: new Date() }, function (err) {
              if (err) return next(err);
            });
          }
        },
        updateCourse: {
          type: courseType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            course: {
              type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve(root, params) {
            return StudentModel.findByIdAndUpdate(params.id, { name: params.name, course: params.course}, function (err) {
              if (err) return next(err);
            });
          }
        },
        removeStudent: {
          type: studentType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const delStudent = StudentModel.findByIdAndRemove(params.id).exec();
            if (!delStudent) {
              throw new Error('Error')
            }
            return delStudent;
          }
        }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});