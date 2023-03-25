import * as yup from 'yup';

export const userSchema = yup.object({
    email: yup.string().required("Please enter your email").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/, "Please Enter valid E-Mail"),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, "Must Contain 8 letters, One UpperCase letter, One LowerCase letter, One special Character and One symbol")
});