import { View, Text, TextInput, Button, StyleSheet,SafeAreaView } from "react-native";
import { Formik, FormikHelpers, Field } from "formik";
import * as Yup from "yup";

interface IFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const initialValues: IFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (
    values: IFormValues,
    actions: FormikHelpers<IFormValues>
  ) => {
    alert(`Sign Up successful`);
    actions.resetForm();
    actions.setSubmitting(false);
  };
  const getPasswordStrength = (password: string) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const numericals = /\d/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [
      length,
      uppercase,
      lowercase,
      numericals,
      specialChar,
    ].filter(Boolean).length;

    if (score === 5) return "Strong";
    if (score === 4) return "Medium";
    if (score === 3) return "Weak";
    return "";
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <SafeAreaView>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            placeholder="Enter your email"
            keyboardType="email-address"
            style={styles.textInput}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            placeholder="Enter your password"
            secureTextEntry
            style={styles.textInput}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            placeholder="Confirm your password"
            secureTextEntry
            style={styles.textInput}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <Text>{getPasswordStrength(values.password)}</Text>
          <Button
            title="Sign up"
            onPress={() => handleSubmit()}
            disabled={
              !values.email || !values.password || !values.confirmPassword
            }
          />
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
    // marginBottom:0,
  },
  label: {
    fontWeight: 600,
    marginBottom: 1,
    marginTop:6
  },
  errorText: {
    color: "red",
    marginBottom:6
  },
});

export default SignUp;
