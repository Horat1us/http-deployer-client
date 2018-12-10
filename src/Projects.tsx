import * as React from 'react';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Project, ProjectsRepository } from "./data/Project";
import { StyleRulesCallback } from "@material-ui/core";

const styles: StyleRulesCallback = (theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[ 5 ],
        padding: theme.spacing.unit * 4,
    },
});

export class Projects extends React.Component<{ classes: any }> {
    public repository = new ProjectsRepository();

    public readonly state: {
        projects: Array<Project>,
        editableProject: Project | undefined,
    } = {
        projects: this.repository.list,
        editableProject: undefined,
    };

    public render() {
        console.log(this.state.projects);
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h4" gutterBottom component="h2">
                    Projects
                    <Button color="primary" onClick={this.handleProjectAdd}>Add</Button>
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Project</TableCell>
                                <TableCell numeric>Servers</TableCell>
                                <TableCell style={{textAlign: 'right'}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.projects.map(project => {
                                return (
                                    <TableRow key={project.name}>
                                        <TableCell component="th" scope="row">
                                            {project.name}
                                        </TableCell>
                                        <TableCell numeric>{project.servers.length}</TableCell>
                                        <TableCell numeric>
                                            <Button color="primary">Edit</Button>
                                            <Button color="secondary" onClick={this.handleDelete(project.name)}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editableProject !== undefined}
                    onClose={this.handleClose}
                >
                    <div style={this.modalStyle} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            Text in a modal
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </div>
                </Modal>
            </div>

        );
    }

    protected get modalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    protected handleProjectAdd = () => {
        this.setState({
            editableProject: {
                name: undefined,
                servers: [],
            }
        });
    };

    protected handleClose = () => {
        this.repository.put(this.state.editableProject);
        this.setState({ projects: this.repository.list, editableProject: undefined });
    }

    protected handleDelete = (name: string) => () => {
        this.setState({ projects: this.repository.delete(name) });
    }
}

export default withStyles(styles)(Projects);

