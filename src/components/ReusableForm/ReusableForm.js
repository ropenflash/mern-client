import React, { useState } from "react";
import { post } from "axios";
import './ReusableForm.css'
import {
  Box,
  Button,
  Form,
  FormField,
  Grommet,
  MaskedInput,
  TextArea,
  TextInput,
} from "grommet";
import { grommet } from "grommet/themes";

const defaultValue = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  ssn: "",
  address: "",
};

export const ReusableForm = (props) => {
  const [value, setValue] = useState(defaultValue);
  const [isSubmitted,setIsSubmitted]=useState(false)
  const handleSubmit = async (e) => {
    try {
      const response = await post("/users/submit", e.value);
      if(response.status===200){
        setValue(defaultValue)
        setIsSubmitted(true)
        setTimeout(()=>{
          setIsSubmitted(false)
        },
        2000)
      }
    } catch (e) {
      console.log("error is", e);
    }
  };
  return (<Grommet  theme={grommet}>
      <Box  align="center" justify="center">
        <Box width="medium">
          <Form
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
            onReset={() => setValue(defaultValue)}
            onSubmit={handleSubmit}
          >
            <FormField label="First Name" name="firstName">
              <TextInput name="firstName" />
            </FormField>
            <FormField label="Last Name" name="lastName">
              <TextInput name="lastName" />
            </FormField>
            <FormField label="Email" name="email" required>
              <MaskedInput
                name="email"
                mask={[
                  { regexp: /^[\w\-_.]+$/, placeholder: "example" },
                  { fixed: "@" },
                  { regexp: /^[\w]+$/, placeholder: "my" },
                  { fixed: "." },
                  { regexp: /^[\w]+$/, placeholder: "com" },
                ]}
              />
            </FormField>
            <FormField label="Contact Number" name="contactNumber">
              <TextInput name="contactNumber" />
            </FormField>
            <FormField label="SSN" name="ssn">
              <TextInput name="ssn" />
            </FormField>
            <FormField label="Full Address" name="address">
              <TextArea name="address" />
            </FormField>
            {isSubmitted && (<div className="message">
          Details Submitted Successfully
    </div>)}
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Submit" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

export default ReusableForm;
