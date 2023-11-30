import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.


export const signUpSchema = yup.object().shape({
    username: yup.string().required("required"),
    email: yup.string().email("please enter a valid email").required("required"),
    password: yup.string().min(6).max(10).matches(passwordRules, {message: "please create a stronger password"}).required("required"),
})


export const loginSchema = yup.object().shape({
    email: yup.string().email("please enter a valid email").required("required"),
    password: yup.string().min(6).max(10).matches(passwordRules,{message: "please create a stronger password"}).required("required")
})