import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";

import { UseMyCutomeHookForAllData } from "../MyCustomeStore/MyCustomeHookForProvideData";

const ForDelete = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    altPhone: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    postalCode: "",
    jobTitle: "",
    employmentStatus: "",
    companyName: "",
    yearsOfExperience: "",
    resume: null,
    monthlyIncome: "",
    loanStatus: "",
    loanAmount: "",
    creditScore: "",
    contactMode: "",
    hobbies: [],
    newsletter: false,
  });

  //this is for getting data from my custome hook
  const { myUrl, profileUserData } = UseMyCutomeHookForAllData();

  //this is for getting data from url
  const { id } = useParams();

  //this is for setting user data
  useEffect(() => {
    if (profileUserData) {
      setFormData((prevState) => ({
        ...prevState,
        name: profileUserData.name || prevState.name,
        email: profileUserData.email || prevState.email,
        password: profileUserData.password || prevState.password,
        confirmPassword: profileUserData.password || prevState.password,
        gender: profileUserData.gender || prevState.gender,
        dateOfBirth: profileUserData.dateOfBirth || prevState.dateOfBirth,
        phone: profileUserData.phone || prevState.phone,
        altPhone: profileUserData.altPhone || prevState.altPhone,
        addressLine1: profileUserData.addressLine1 || prevState.addressLine1,
        addressLine2: profileUserData.addressLine2 || prevState.addressLine2,
        country: profileUserData.country || prevState.country,
        city: profileUserData.city || prevState.city,
        postalCode: profileUserData.postalCode || prevState.postalCode,
        jobTitle: profileUserData.jobTitle || prevState.jobTitle,
        employmentStatus:
          profileUserData.employmentStatus || prevState.employmentStatus,
        companyName: profileUserData.companyName || prevState.companyName,
        yearsOfExperience:
          profileUserData.yearsOfExperience || prevState.yearsOfExperience,
        resume: profileUserData.resume || prevState.resume,
        monthlyIncome: profileUserData.monthlyIncome || prevState.monthlyIncome,
        loanStatus: profileUserData.loanStatus || prevState.loanStatus,
        loanAmount: profileUserData.loanAmount || prevState.loanAmount,
        creditScore: profileUserData.creditScore || prevState.creditScore,
        contactMode: profileUserData.contactMode || prevState.contactMode,
        hobbies: profileUserData.hobbies || prevState.hobbies,
        newsletter: profileUserData.newsletter || prevState.newsletter,
      }));
    }
  }, [profileUserData]);

  //this is for navigate
  const navigate = useNavigate();

  //this is for handle submit
  const handleSubmitDelete = async (e) => {
    e.preventDefault();

    const url = `${myUrl}/forms/${id}`;
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.delete(url);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.msg);
        navigate("/");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Box sx={{ width: "80%", margin: "0 auto", mt: 5 }}>
      <Box
        sx={{
          width: { xs: "100%", sm: "auto" },
          mx: "auto",
          py: 4,
          px: { xs: 0, sm: 2 },
        }}
      >
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Summary
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(formData).map(
              (key, index) =>
                index <= 24 && (
                  <Grid item xs={12} key={index}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        p: 2,
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9",
                        overflow: "hidden",
                      }}
                    >
                      <Box sx={{ flexGrow: 1, mr: 2, minWidth: 0 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }}
                        >
                          {key}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#555",
                            mt: 0.5,
                          }}
                        >
                          {key === "resume" && formData[key] instanceof File
                            ? formData[key].name
                            : formData[key] || "Not Provided"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )
            )}
          </Grid>
          <Button
            onClick={(e) => handleSubmitDelete(e)}
            variant="contained"
            color="success"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Delete
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ForDelete;
