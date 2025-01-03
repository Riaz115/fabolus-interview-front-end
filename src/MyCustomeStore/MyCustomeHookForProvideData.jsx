import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//this is for my data
export const MyCustomeAllDataProvider = createContext();

//this is for provide data
export const MyAllDataProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileUserData, setProfileUserData] = useState(
    localStorage.getItem("userdata")
  );
  const [addText, setAddText] = useState(null);

  //this is my backend url
  const myUrl = "http://localhost:8000/api";

  //this is function for getting all profile users
  const forGettingAllUsers = async () => {
    setLoading(true);
    const url = `${myUrl}/forms`;
    try {
      const response = await axios(url);
      const data = response.data;
      if (response.status === 200 || response.status === 201) {
        setAllUsers(data);
        setLoading(false);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(
          "there is error in the getting all profile user funciton",
          err
        );
      }
    }
  };

  //this is for controll rendering for getting all users
  useEffect(() => {
    forGettingAllUsers();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("userdata");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProfileUserData(parsedData);
    }
  }, []);

  //this is for getting data for edit the profil user
  const forGettingDataForEditTheProfileUser = async (id) => {
    const url = `${myUrl}/get/data/${id}/for/edit/users`;
    try {
      const response = await axios(url);
      const data = response.data;
      if (response.status === 200 || response.status === 201) {
        setProfileUserData(data);
        // localStorage.setItem("userdata", data);
        localStorage.setItem("userdata", JSON.stringify(data));
      }
    } catch (err) {
      if (err.response) {
        console.log("err data", err.response.data);
      } else {
        console.log(
          "there is error in the getting data for edit profile user function",
          err
        );
      }
    }
  };

  return (
    <MyCustomeAllDataProvider.Provider
      value={{
        myUrl,
        allUsers,
        setAllUsers,
        forGettingAllUsers,
        forGettingDataForEditTheProfileUser,
        profileUserData,
        setProfileUserData,
        addText,
        setAddText,
        loading,
      }}
    >
      {children}
    </MyCustomeAllDataProvider.Provider>
  );
};

//this is for custome hook
export const UseMyCutomeHookForAllData = () => {
  const myAllData = useContext(MyCustomeAllDataProvider);
  if (!myAllData) {
    console.log("store file error components not wrapped correctly");
    alert("store file error components not wrapped correctly");
  }

  return myAllData;
};
