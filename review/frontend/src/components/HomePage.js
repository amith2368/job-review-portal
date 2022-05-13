import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import CreateApp from "./CreateApp";
import ViewApp from "./ViewApp";
import { Grid, 
    Button, 
    ButtonGroup, 
    Typography,  
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container } from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes,
  Navigate,
} from "react-router-dom";

export default function HomePage() {

    const [candidatesData, setCandidatesData] = useState([]);

    useEffect(() => {
        fetch("/api/get-candidates")
        .then(res => res.json())
        .then(data => {
            setCandidatesData(data);
        });
    }, []);

    function createData(name, gender, phone_number, status, view) {
        return { name, gender, phone_number, status, view };
      }
      
    const rows = []

    candidatesData.map(candidate => {
        let status = "";
        if(candidate.status == "X") {
            status = "Applied";
        } else if(candidate.status == "A") {
            status = "Accepted";
        } else if(candidate.status == "R") {  
            status = "Rejected";
        }  else {
            status = "Error";
        }
        let app_link = "/view/" + candidate.app_code;
        rows.push(createData(candidate.name, candidate.gender, candidate.phone_number, status, app_link));
    });

    function renderHomePage() {
        return (
            <Container maxWidth="md">
            <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                    <Typography component="h3" variant="h3">
                        Job Application Review Portal
                    </Typography>
                </Grid>
                <Grid item xs={12} align="right">
                  <ButtonGroup disableElevation variant="contained" color="primary" aria-label="contained primary button group">
                    <Button color="secondary" component={Link} to="/create">Add New Candidate</Button>
                  </ButtonGroup>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Candidate Name</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.gender}</TableCell>
                            <TableCell align="right">{row.phone_number}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right"><Button color="primary" component={Link} to={row.view}>View</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            </Container>
        );
    }

    return (
      <Router>
        <Routes>
          <Route exact path="/" element={ renderHomePage() } />
          <Route path="/view" element={<ViewApp />} />
          <Route path="/create" element={<CreateApp />} />
          <Route path="/view/:appCode" element={<ViewApp /> } />
          {/* <Route path="/room/:roomCode" element={<Room />} /> */}
        </Routes>
      </Router>
    );
}