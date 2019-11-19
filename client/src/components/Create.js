import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const ADD_STUDENT = gql`
    mutation AddStudent(
        $name: String!,
        $course: String!,
        $rollnumber: String!,
        $address: String!,
        $gender: String!,
        $birth_year: Int!) {
        addStudent(
            name: $name,
            course: $course,
            rollnumber: $rollnumber,
            address: $address,
            gender: $gender,
            birth_year: $birth_year) {
            _id
        }
    }
`;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

class Create extends Component {

    render() {
        let name, course, rollnumber, address, birth_year, gender;
        return (
            <div className="container">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Add Student - Details
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Button variant="contained" color="default" className={"backBtn"}><Link to="/">Home</Link></Button>
                <Mutation mutation={ADD_STUDENT} onCompleted={() => this.props.history.push('/')}>
                    {(addStudent, { loading, error }) => (
                       
                        <div className="panel-body">
                             <form className={classes.container} noValidate autoComplete="off" onSubmit={e => {
                                e.preventDefault();
                                addStudent({ variables: { name: name.value, course: course.value, rollnumber: rollnumber.value, address: address.value, gender: gender.value, birth_year: parseInt(birth_year.value) } });
                                name.value = "";
                                course.value = "";
                                rollnumber.value = "";
                                address.value = "";
                                gender.value = null;
                                birth_year.value = "";
                            }}>
                                <div>
                                <TextField required id="standard-required" label="Required" defaultValue="Student Name" className={classes.textField} margin="normal" ref={node => {
                                        name = node;
                                    }}/>
                                </div> 
                                <div className="form-group">
                                    <label htmlFor="course">Course:</label>
                                    <input type="text" className="form-control" name="course" ref={node => {
                                        course = node;
                                    }} placeholder="Course" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rollnumber">Rollnumber:</label>
                                    <input type="text" className="form-control" name="author" ref={node => {
                                        rollnumber = node;
                                    }} placeholder="Roll number" />
                                </div>
                                <div className="form-group"> ref={node => {
                                        name = node;
                                    }}
                                    <label htmlFor="address">Address:</label>
                                    <textarea className="form-control" name="address" ref={node => {
                                        address = node;
                                    }} placeholder="Address" cols="80" rows="3" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>
                                    <input type="text" className="form-control" name="gender" ref={node => {
                                        gender = node;
                                    }} placeholder="Gender" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">Birth Year:</label>
                                    <input type="number" className="form-control" name="birth_year" ref={node => {
                                        birth_year = node;
                                    }} placeholder="Birth Year" />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default Create;