import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography, red, green } from "@material-ui/core";

export default function ViewApp() {

    let { appCode } = useParams();
    const navigate = useNavigate();
    const [candidateData, setCandidateData] = useState({});

    useEffect(() => {
        fetch("/api/view-candidate/" + appCode)
        .then(response => response.json())
        .then(data => {setCandidateData(data)});
    }, []);

    function handleSave(event) {
        const requestoptions = {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(candidateData.status)
        }
        fetch("/api/update-status/" + appCode, requestoptions)
        .then(res => {
            if(res.status == 200)
                alert("Application status updated successfully!");
            else
                alert("Error updating application status!");
            
        })
        .then(navigate("/"));
    }

    function current_status() {
        if(candidateData.status == "X") {
            return "Applied";
        } else if(candidateData.status == "A") {
            return "Accepted";
        } else if(candidateData.status == "R") {  
            return "Rejected";
        }  else {
            return "Error";
        }
    }

    return (
        <div>
            <h1>View Application</h1>
            <h3>Application Number: {candidateData.app_code}</h3>
            <h3>Name: {candidateData.name}</h3>
            <h3>Gender: {candidateData.gender}</h3>
            <h3>Phone: {candidateData.phone_number}</h3>
            <h1>Candidate Status: {current_status()}</h1>
            <h3>What is your decision?</h3>
            <Button 
                variant="contained"
                color="primary"
                onClick={e => {setCandidateData({...candidateData, status: "A"})}}
            >
                Accept
            </Button>
            <Button 
                variant="contained"
                color="secondary"
                onClick={e => {setCandidateData({...candidateData, status: "R"})}}
            >
                Reject
            </Button>
            <Button 
                variant="contained"
                color="primary"
                onClick={handleSave}
            >
                Save and Exit
            </Button>
        </div>
    );
}