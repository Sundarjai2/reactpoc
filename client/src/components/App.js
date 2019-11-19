import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';

const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      course
      gender
    }
  }
`;

function App() {
  // const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });
  return (
    // <MaterialTable
    //   title="Editable Example"
    //   columns={state.columns}
    //   data={state.data}
    //   editable={{
    //     onRowAdd: newData =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           setState(prevState => {
    //             const data = [...prevState.data];
    //             data.push(newData);
    //             return { ...prevState, data };
    //           });
    //         }, 600);
    //       }),
    //     onRowUpdate: (newData, oldData) =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           if (oldData) {
    //             setState(prevState => {
    //               const data = [...prevState.data];
    //               data[data.indexOf(oldData)] = newData;
    //               return { ...prevState, data };
    //             });
    //           }
    //         }, 600);
    //       }),
    //     onRowDelete: oldData =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           setState(prevState => {
    //             const data = [...prevState.data];
    //             data.splice(data.indexOf(oldData), 1);
    //             return { ...prevState, data };
    //           });
    //         }, 600);
    //       }),
    //   }}
    // />
    <Query pollInterval={500} query={GET_STUDENTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
  
        return (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  LIST OF STUDENTS
                </h3>
                <h4><Link to="/create">Add Student</Link></h4>
              </div>
              <div className="panel-body">
                <table className="table table-stripe">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Gender</th>
                    </tr>                                                                               
                  </thead>
                  <tbody>
                    {data.students.map((student, index) => (
                      <tr key={index}>
                        <td><Link to={`/show/${student._id}`}>{student.name}</Link></td>
                        <td>{student.course}</td>
                        <td>{student.gender == "M" ? 'Male':'Female'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default App;
