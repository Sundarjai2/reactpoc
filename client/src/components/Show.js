import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';



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
}));
const useStylesForList = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
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
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
})
function HigherOrderComponent(props) {
    const { classes } = props;
}

class Show extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Query pollInterval={500} query={GET_STUDENT} variables={{ studentId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6">{data.student.name} - Details</Typography>
                                </Toolbar>
                            </AppBar>
                            <Button variant="contained" color="default" className={"backBtn"}><Link to="/">Home</Link></Button>
                            <List className={classes.root}>
                                <ListItem>
                                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                </ListItem>
                            </List>
                            {/*                             
                            <div className="panel-body">
                                <dl>
                                    <dt>Name:</dt>
                                    <dd>{data.student.name}</dd>
                                    <dt>Rollnumber:</dt>
                                    <dd>{data.student.rollnumber}</dd>
                                    <dt>Course:</dt>
                                    <dd>{data.student.course}</dd>
                                    <dt>Birth Year:</dt>
                                    <dd>{data.student.birth_year}</dd>
                                    <dt>Gender:</dt>
                                    <dd>{data.student.gender}</dd>
                                    <dt>Address:</dt>
                                    <dd>{data.student.address}</dd>
                                    <dt>Updated:</dt>
                                    <dd>{data.student.updated_date}</dd>
                                </dl>
                                <Mutation mutation={DELETE_STUDENT} key={data.student._id} onCompleted={() => this.props.history.push('/')}>
                                    {(removeStudent, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeStudent({ variables: { id: data.student._id } });
                                                }}>
                                                <Link to={`/edit/${data.student._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                  <button type="submit" className="btn btn-danger">Delete</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
                            </div> */}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default withStyles(styles)(Show);