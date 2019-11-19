import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_STUDENT = gql`
    query student($studentId: String) {
        student(id: $studentId) {
            _id
            name
            course
            rollnumber
            address
            birth_year
            gender
            updated_date
        }
    }
`;

const UPDATE_STUDENT = gql`
    mutation updateStudent(
        $id: String!,
        $name: String!,
        $course: String!,
        $rollnumber: String!,
        $address: String!,
        $gender: String!,
        $birth_year: Int!) {
        updateStudent(
        id: $id,
        name: $name,
        course: $course,
        rollnumber: $rollnumber,
        address: $address,
        gender: $gender,
        birth_year: $birth_year) {
            updated_date
        }
    }
`;

class Edit extends Component {

    render() {
      let name, course, rollnumber, address, birth_year, gender;
      return (
          <Query query={GET_STUDENT} variables={{ studentId: this.props.match.params.id }}>
              {({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;
          
                  return (
                      <Mutation mutation={UPDATE_STUDENT} key={data.student._id} onCompleted={() => this.props.history.push(`/`)}>
                          {(updateStudent, { loading, error }) => (
                              <div className="container">
                                  <div className="panel panel-default">
                                      <div className="panel-heading">
                                          <h3 className="panel-title">
                                              EDIT STUDENT
                                          </h3>
                                      </div>
                                      <div className="panel-body">
                                          <h4><Link to="/" className="btn btn-primary">Student List</Link></h4>
                                          <form onSubmit={e => {
                                              e.preventDefault();
                                              updateStudent({ variables: { id: data.student._id, name: name.value, course: course.value, rollnumber: rollnumber.value, address: address.value, gender: gender.value, birth_year: parseInt(birth_year.value) } });
                                              name.value = "";
                                              course.value = "";
                                              rollnumber.value = "";
                                              address.value = "";
                                              gender.value = null;
                                              birth_year.value = "";
                                          }}>
                                              <div className="form-group">
                                                  <label htmlFor="name">name:</label>
                                                  <input type="text" className="form-control" name="name" ref={node => {
                                                      name = node;
                                                  }} placeholder="name" defaultValue={data.student.name} />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="course">course:</label>
                                                  <input type="text" className="form-control" name="course" ref={node => {
                                                      course = node;
                                                  }} placeholder="course" defaultValue={data.student.course} />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="rollnumber">rollnumber:</label>
                                                  <input type="text" className="form-control" name="rollnumber" ref={node => {
                                                      rollnumber = node;
                                                  }} placeholder="rollnumber" defaultValue={data.student.rollnumber} />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="address">address:</label>
                                                  <textarea className="form-control" name="address" ref={node => {
                                                      address = node;
                                                  }} placeholder="address" cols="80" rows="3" defaultValue={data.student.address} />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="rollnumber">gender:</label>
                                                  <input type="text" className="form-control" name="gender" ref={node => {
                                                      gender = node;
                                                  }} placeholder="gender" defaultValue={data.student.gender} />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="rollnumber">Published Year:</label>
                                                  <input type="number" className="form-control" name="birth_year" ref={node => {
                                                      birth_year = node;
                                                  }} placeholder="Published Year" defaultValue={data.student.birth_year} />
                                              </div>
                                              <button type="submit" className="btn btn-success">Submit</button>
                                          </form>
                                          {loading && <p>Loading...</p>}
                                          {error && <p>Error :( Please try again</p>}
                                      </div>
                                  </div>
                              </div>
                          )}
                      </Mutation>
                  );
              }}
          </Query>
      );
    }
  }

  export default Edit;