import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import classNames from 'classnames';

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

const DELETE_STUDENT = gql`
  mutation removeStudent($id: String!) {
    removeStudent(id:$id) {
      _id
    }
  }
`;


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  addLink: {
    color: '#ffffff'
  }
}));

function App() {
  const classes = useStyles();
  // const [state, setState] = React.useState({
  //   columns: [
  //     { title: 'Name', field: 'name' },
  //     { title: 'Surname', field: 'surname' },
  //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
  //     {
  //       title: 'Birth Place',
  //       field: 'birthCity',
  //       lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
  //     },
  //   ],
  //   data: [
  //     { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  //     {
  //       name: 'Zerya Betül',
  //       surname: 'Baran',
  //       birthYear: 2017,
  //       birthCity: 34,
  //     },
  //   ],
  // });
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
            <AppBar position="static">
              <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
                <Typography variant="h6" className={classNames({ [classes.title]: true, [useStyles.addLink]: true })}>
                  LIST OF STUDENTS
            </Typography>
                {/* <Button color="inherit">Login</Button> */}
              </Toolbar>
            </AppBar>
            <Button variant="contained" href="/create" color="primary" className={classes.button, "addBtn"}>
              Add Student</Button>
            <Paper className={classes.root}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>SI No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.students.map((student, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.gender == "M" ? 'Male' : 'Female'}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" className={classes.button, classes.margin, "editStd"}><Link to={`/show/${student._id}`}>Show</Link></Button>
                        {/* <Mutation mutation={DELETE_STUDENT} key={student._id} onCompleted={() => this.props.history.push('/')}>
                          {(removeStudent, { loading, error }) => (
                            <div>
                              <form
                                onSubmit={e => {
                                  e.preventDefault();
                                  removeStudent({ variables: { id: student._id } });
                                }}>
                              </form>

                            </div>
                          )}
                        </Mutation>

                        <Mutation mutation={DELETE_STUDENT} key={student._id}>
                          {(removeStudent, { loading, error }) => (
                            <div>
                              <form
                                onSubmit={e => {
                                  e.preventDefault();
                                  removeStudent({ variables: { id: student._id } });
                                }}>
                                <button type="submit" color="secondary" className={classes.margin, classes.button}>Delete</button>
                              </form>
                              {loading && <p>Loading...</p>}
                              {error && <p>Error :( Please try again )</p>}
                            </div>
                          )}
                        </Mutation> */}
                        {/* <Button variant="contained" color="secondary" className={classes.button, "deleteStd"}><Link to={`/show/${student._id}`}>Edit</Link></Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

          </div>
        );
      }}
    </Query>
  );
}

export default App;
