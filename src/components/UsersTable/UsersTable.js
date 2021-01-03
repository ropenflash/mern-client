import React, { useEffect, useState } from "react";
import { getData } from "../../api/api";
import { Grommet, Box, DataTable } from "grommet";
import Loader from 'react-loader-spinner'
import { grommet } from "grommet/themes";
import { useAuth } from "../../context/auth";
import './UsersTable.css'

const columns = [
  { property: "firstName", header: "First Name" },
  { property: "lastName", header: "Last Name" },
  { property: "email", header: "Email Address" },
  { property: "contactNumber", header: "Contact Number" },
  { property: "ssn", header: "SSN" },
  { property: "address", header: "Full Address" },
];

const UsersTable = (props) => {
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading]= useState(true)
  const { authTokens } = useAuth();

  
  useEffect(() => {
    let mounted = true
    getData(authTokens)
      .then((res) => {
        if (mounted) {
          setData(res.data);  
        setIsLoading(false)
      }
        
      })
      .catch((e) => {
        console.log(e);
      });
      return function cleanup() {
        mounted = false
    }
  }, [authTokens]);

  if(isLoading){
   return ( 
     <div className="loader">
    <Loader type="Grid" color="#00BFFF" height={80} width={80} />
    </div>
      )
  }
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <DataTable columns={columns} data={data} step={10} />
      </Box>
    </Grommet>
  );
};

export default UsersTable;
