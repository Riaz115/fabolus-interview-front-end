import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  InputAdornment,
  Input,
  IconButton,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UseMyCutomeHookForAllData } from "../MyCustomeStore/MyCustomeHookForProvideData";
import { useNavigate, useParams } from "react-router-dom";

const steps = [
  "Profile",
  "Contact",
  "Employment",
  "Financial",
  "Preferences",
  "Summary",
];

const ForEditUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities] = useState(["Karachi", "Lahore", "Islamabad"]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, seterrors] = useState({});
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

  //this is for getting data id from url of user
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

  //this is for current date
  const currentDate = new Date().toISOString().split("T")[0];

  //this is for catch errors
  const forCatchErrors = () => {
    let isOk = true;
    let newErrors = {};
    switch (currentStep) {
      case 1: // Personal Information
        if (!formData.name.trim()) {
          isOk = false;
          newErrors.name = "Name is required";
          toast.error("Name is required");
        } else if (!formData.email.trim()) {
          isOk = false;
          newErrors.email = "Email is required";
          toast.error("Email is required");
        } else if (!validator.isEmail(formData.email)) {
          isOk = false;
          newErrors.email = "Invalid email";
          toast.error("Invalid email");
        } else if (formData.password.length < 6) {
          isOk = false;
          newErrors.password = "password must should be at least 6 characters";
          toast.error("password must should be at least 6 characters");
        } else if (formData.password !== formData.confirmPassword) {
          isOk = false;
          newErrors.confirmPassword =
            "password should be match confirm password";
          toast.error("password should be match confirm password");
        } else if (!formData.gender) {
          isOk = false;
          newErrors.gender = "Gender is required";
          toast.error("Gender is required");
        } else if (!formData.dateOfBirth) {
          isOk = false;
          newErrors.dateOfBirth = "Date of birth is required";
          toast.error("Date of birth is required");
        }
        break;
      case 2: // Address Information
        if (formData.phone.length < 8) {
          isOk = false;
          newErrors.phone = "Invalid Phone Number";
          toast.error("Phone number must should be greater than 8 letters");
        } else if (!formData.addressLine1.trim()) {
          isOk = false;
          newErrors.addressLine1 = "Address line 1 is required";
          toast.error("Address line 1 is required");
        } else if (!formData.country.trim()) {
          isOk = false;
          newErrors.country = "Country is required";
          toast.error("Country is required");
        } else if (!formData.city.trim()) {
          isOk = false;
          newErrors.city = "City is required";
          toast.error("City is required");
        } else if (!formData.postalCode.trim()) {
          isOk = false;
          newErrors.postalCode = "Postal code is required";
          toast.error("Postal code is required");
        }
        break;
      case 3: // Job Information
        if (formData.jobTitle === "") {
          isOk = false;
          newErrors.jobTitle = "Job title is required";
          toast.error("Job title is required");
        } else if (formData.employmentStatus === "") {
          isOk = false;
          newErrors.employmentStatus = "Employment status is required";
          toast.error("Employment status is required");
        } else if (
          formData.employmentStatus === "Employed" &&
          !formData.companyName.trim()
        ) {
          isOk = false;
          newErrors.companyName = "Company name is required";
          toast.error("Company name is required");
        } else if (formData.yearsOfExperience === "") {
          isOk = false;
          newErrors.yearsOfExperience = "Years of experience is required";
          toast.error("Years of experience is required");
        } else if (!formData.resume) {
          isOk = false;
          newErrors.resume = "Resume is required";
          toast.error("Resume is required");
        }
        break;
      case 4: // Financial Information
        if (formData.monthlyIncome === "") {
          isOk = false;
          newErrors.monthlyIncome = "Monthly income is required";
          toast.error("Monthly income is required");
        } else if (!formData.loanStatus) {
          isOk = false;
          newErrors.loanStatus = "Loan status is required";
          toast.error("Loan status is required");
        } else if (
          formData.loanStatus === "yes" &&
          formData.loanAmount === ""
        ) {
          isOk = false;
          newErrors.loanAmount = "Loan amount is required";
          toast.error("Loan amount is required");
        } else if (formData.creditScore === "") {
          isOk = false;
          newErrors.creditScore = "Credit score is required";
          toast.error("Credit score is required");
        }
        break;
      case 5: // Additional Information
        if (!formData.contactMode) {
          isOk = false;
          newErrors.contactMode = "Contact mode is required";
          toast.error("Contact mode is required");
        } else if (formData.hobbies.length === 0) {
          isOk = false;
          newErrors.hobbies = "At least one hobby is required";
          toast.error("At least one hobby is required");
        } else if (formData.newsletter === false) {
          isOk = false;
          newErrors.newsletter = "please check newsletter box";
          toast.error("please check newsletter box");
        }
        break;
      default:
        break;
    }
    seterrors(newErrors);
    return isOk;
  };

  //this is for next step
  const handleNext = () => {
    const isValid = forCatchErrors();
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  //this is for back step
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  //this is for password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //this is for confirm password
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Function to fetch countries
  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (err) {
      toast.error("Counteries not fetch");
    }
  };

  // Fetch countries when component mounts
  useEffect(() => {
    fetchCountries();
  }, []);

  //this is for search countries from input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  //this is for handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //this is for click on edit button and go to the section
  const forClickOnEditButtonToSection = (index) => {
    if (index <= 6) {
      setCurrentStep(1);
    } else if (index > 6 && index <= 13) {
      setCurrentStep(2);
    } else if (index > 13 && index <= 18) {
      setCurrentStep(3);
    } else if (index > 18 && index <= 22) {
      setCurrentStep(4);
    } else if (index > 22 && index <= 25) {
      setCurrentStep(5);
    }
  };

  // Handle the multi-select change for hobbies
  const handleMultiSelectChange = (event) => {
    const selectedHobbies = event.target.value;
    setFormData({ ...formData, hobbies: selectedHobbies });
  };

  //this is for handle submit
  const handleSubmitForUpdate = async (e) => {
    e.preventDefault();

    const url = `${myUrl}/forms/${id}`;
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.patch(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      <Stepper
        activeStep={currentStep - 1}
        alternativeLabel
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ my: 4 }}>
        {currentStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              User Profile
            </Typography>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.name}
              </p>
            )}
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.email}
              </p>
            )}

            <TextField
              label="Password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.password}
              </p>
            )}
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={confirmPasswordVisible ? "text" : "password"}
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.confirmPassword}
              </p>
            )}

            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {errors.gender && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.gender}
              </p>
            )}

            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.dateOfBirth}
              onChange={handleChange}
              inputProps={{ max: currentDate }}
              InputProps={{
                endAdornment: <InputAdornment position="end"></InputAdornment>,
              }}
            />
            {errors.dateOfBirth && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.dateOfBirth}
              </p>
            )}
          </Box>
        )}

        {currentStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <TextField
              label="Phone Number"
              name="phone"
              type="number"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.phone}
              </p>
            )}
            <TextField
              label="Alternate Phone Number"
              name="altPhone"
              fullWidth
              type="number"
              margin="normal"
              value={formData.altPhone}
              onChange={handleChange}
            />
            <TextField
              label="Address Line 1"
              name="addressLine1"
              fullWidth
              margin="normal"
              value={formData.addressLine1}
              onChange={handleChange}
            />
            {errors.addressLine1 && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.addressLine1}
              </p>
            )}
            <TextField
              label="Address Line 2"
              name="addressLine2"
              fullWidth
              margin="normal"
              value={formData.addressLine2}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem disabled>
                  <Input
                    fullWidth
                    placeholder="Search Country"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    autoFocus
                    disableUnderline
                  />
                </MenuItem>

                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <MenuItem key={index} value={country.cca3}>
                      {country.name.common}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No countries found</MenuItem>
                )}
              </Select>
              {errors.country && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "5px",
                  }}
                >
                  {errors.country}
                </p>
              )}
            </FormControl>

            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {errors.city && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginLeft: "5px",
                }}
              >
                {errors.city}
              </p>
            )}

            <TextField
              label="Postal Code"
              name="postalCode"
              fullWidth
              margin="normal"
              value={formData.postalCode}
              onChange={handleChange}
            />
            {errors.postalCode && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginLeft: "5px",
                }}
              >
                {errors.postalCode}
              </p>
            )}
          </Box>
        )}

        {currentStep === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Employment Information
            </Typography>
            <TextField
              label="Current Job Title"
              name="jobTitle"
              fullWidth
              margin="normal"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            {errors.jobTitle && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.jobTitle}
              </p>
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel>Employment Status</InputLabel>
              <Select
                label="Employment Status"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
              >
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Unemployed">Unemployed</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </Select>
              {errors.employmentStatus && (
                <p
                  style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}
                >
                  {errors.employmentStatus}
                </p>
              )}
            </FormControl>
            {formData.employmentStatus === "Employed" && (
              <TextField
                label="Company Name"
                name="companyName"
                fullWidth
                margin="normal"
                value={formData.companyName}
                onChange={handleChange}
              />
            )}
            {errors.companyName && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.companyName}
              </p>
            )}
            <TextField
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              fullWidth
              margin="normal"
              value={formData.yearsOfExperience}
              onChange={handleChange}
            />
            {errors.yearsOfExperience && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.yearsOfExperience}
              </p>
            )}

            <div>
              <Button
                variant="contained"
                component="label"
                sx={{ marginTop: 2 }}
              >
                {formData.resume
                  ? formData.resume.name || formData.resume
                  : "Upload Resume"}
                <input
                  type="file"
                  hidden
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFormData((prev) => ({
                      ...prev,
                      resume: file || prev.resume,
                    }));
                  }}
                />
              </Button>
            </div>
          </Box>
        )}

        {currentStep === 4 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Financial Information
            </Typography>
            <TextField
              label="Monthly Income"
              name="monthlyIncome"
              type="number"
              fullWidth
              margin="normal"
              value={formData.monthlyIncome}
              onChange={handleChange}
            />
            {errors.monthlyIncome && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.monthlyIncome}
              </p>
            )}
            <FormLabel component="legend">Loan Status</FormLabel>
            <RadioGroup
              row
              name="loanStatus"
              value={formData.loanStatus}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            {errors.loanStatus && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.loanStatus}
              </p>
            )}
            {formData.loanStatus === "yes" && (
              <TextField
                label="Loan Amount"
                name="loanAmount"
                type="number"
                fullWidth
                margin="normal"
                value={formData.loanAmount}
                onChange={handleChange}
              />
            )}
            {errors.loanAmount && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.loanAmount}
              </p>
            )}
            <TextField
              label="Credit Score"
              name="creditScore"
              type="number"
              fullWidth
              margin="normal"
              value={formData.creditScore}
              onChange={handleChange}
            />
            {errors.creditScore && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.creditScore}
              </p>
            )}
          </Box>
        )}

        {currentStep === 5 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <FormLabel component="legend">Preferred Mode of Contact</FormLabel>
            <RadioGroup
              row
              name="contactMode"
              value={formData.contactMode}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Email"
                control={<Radio />}
                label="Email"
              />
              <FormControlLabel
                value="Phone"
                control={<Radio />}
                label="Phone"
              />
              <FormControlLabel value="SMS" control={<Radio />} label="SMS" />
            </RadioGroup>
            {errors.contactMode && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.contactMode}
              </p>
            )}

            <FormControl fullWidth margin="normal">
              <InputLabel>Hobbies and Interests</InputLabel>
              <Select
                label="Hobbies and Interests"
                name="hobbies"
                multiple
                value={formData.hobbies}
                onChange={handleMultiSelectChange}
              >
                <MenuItem value="Reading">
                  <Checkbox
                    checked={formData.hobbies.includes("Reading")}
                    value="Reading"
                  />
                  <ListItemText primary="Reading" />
                </MenuItem>
                <MenuItem value="Traveling">
                  <Checkbox
                    checked={formData.hobbies.includes("Traveling")}
                    value="Traveling"
                  />
                  <ListItemText primary="Traveling" />
                </MenuItem>
                <MenuItem value="Cooking">
                  <Checkbox
                    checked={formData.hobbies.includes("Cooking")}
                    value="Cooking"
                  />
                  <ListItemText primary="Cooking" />
                </MenuItem>
              </Select>
            </FormControl>

            {errors.hobbies && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.hobbies}
              </p>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.newsletter}
                  onChange={(e) =>
                    setFormData({ ...formData, newsletter: e.target.checked })
                  }
                />
              }
              label="Subscribe to Newsletter"
            />
            {errors.newsletter && (
              <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>
                {errors.newsletter}
              </p>
            )}
          </Box>
        )}

        {currentStep === 6 && (
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
                          <Button
                            onClick={() =>
                              forClickOnEditButtonToSection(index + 1)
                            }
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "darkblue",
                              },
                              whiteSpace: "nowrap",
                            }}
                          >
                            Edit
                          </Button>
                        </Box>
                      </Grid>
                    )
                )}
              </Grid>
              <Button
                onClick={(e) => handleSubmitForUpdate(e)}
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
                Update
              </Button>
            </Paper>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            disabled={currentStep === steps.length + 1 - 1}
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForEditUser;
