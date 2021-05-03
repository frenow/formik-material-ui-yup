import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { Paper, withStyles, Button, TextField } from "@material-ui/core";
import * as Yup from "yup";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${
      theme.spacing.unit * 5
    }px`
  },
  container: {
    maxWidth: "200px"
  }
});

const validationSchema = Yup.object({
  name: Yup.string("Enter a name").required("Name is required"),

  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),

  confirmPassword: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

const inputForm = (props) => {
  const classes = props;

  const [valores, setValores] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: valores,
    validationSchema,
    onSubmit
  });
  const change = (name, e) => {
    console.log(`name: ${name}, value: ${e}`);
    e.persist();

    formik.handleChange(e);
    console.log(formik.errors);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <>
      <div className={classes.container}>
        <Paper elevation={1} className={classes.Paper}>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="name"
                name="name"
                label="Name"
                helperText={formik.touched.name ? formik.errors.name : ""}
                onChange={(e) => change("name", e)}
                value={formik.name}
                fullWidth
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                helperText={formik.touched.email ? formik.errors.email : ""}
                error={formik.touched.email && Boolean(formik.errors.email)}
                onChange={(e) => change("email", e)}
                value={formik.email}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                helperText={
                  formik.touched.password ? formik.errors.password : ""
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                onChange={(e) => change("password", e)}
                value={formik.password}
                fullWidth
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                helperText={
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : ""
                }
                onChange={(e) => change("confirmPassword", e)}
                value={formik.confirmPassword}
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                disabled={!formik.isValid}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </FormikProvider>
        </Paper>
      </div>
    </>
  );
};

export default withStyles(styles)(inputForm);
