import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, 
    Typography, 
    FormControl, 
    TextField,
    MenuItem,
    Button } from "@material-ui/core";

const gender_types = [
    {
        value: 'M',
        label: 'Male'
    },
    {
        value: 'F',
        label: 'Female'
    }
]


export default function CreateApp() {

    const navigate = useNavigate();
    
    const [candidateData, setCandidateData] = useState({
        name: "",
        gender: "M",
        phone_number: "",
    });

    function handleApplicationSubmit(event) {
        
        const requestoptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(candidateData)
        }

        fetch("/api/create-candidate", requestoptions)
        .then(res => {
            if(res.status == 201) 
                alert("Application submitted successfully!");

            else
                alert("Error submitting application!");
            
        })
        .then(navigate("/"));
    }
    
    return (
        <Grid container spacing={3} align="center">
            <Grid item xs={12}>
                <Typography component="h3" variant="h3">
                    Create Candidate Data
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <TextField id="name" 
                        label="Name" 
                        variant="outlined" 
                        onChange={(e) => setCandidateData({...candidateData, name: e.target.value})} 
                        helperText="Please enter your Full Name"
                    /> &nbsp;
                    <TextField 
                        id="gender"
                        select
                        label="Gender"
                        variant="outlined"
                        value={candidateData.gender}
                        onChange={(e) => setCandidateData({...candidateData, gender: e.target.value})}
                    >
                        {gender_types.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>&nbsp;
                    <TextField id="phone_number" label="Phone Number" type="number" variant="outlined" onChange={(e) => setCandidateData({...candidateData, phone_number: e.target.value})} />
                    &nbsp;
                    <Button variant="contained" color="primary" onClick={handleApplicationSubmit} >
                            Submit Application
                    </Button>            
                </FormControl>
            </Grid>
        </Grid>
    );
} 