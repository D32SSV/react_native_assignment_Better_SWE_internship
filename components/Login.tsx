import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const initialValues: FormValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const saveEmailToStorage = async (email: string, password: string) => {
    try {
      await AsyncStorage.setItem(email, password);

      let cred = await AsyncStorage.getItem(email);
      alert(`Saved Credentials are:  ${email}  ||  ${cred}`);
    } catch (error) {
      console.error("Failed to save user Credentials", error);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    alert(`Login success!`);
    if (values.rememberMe) {
      saveEmailToStorage(values.email, values.password);
      actions.resetForm();
    } else {
      let email = await AsyncStorage.getAllKeys();
      console.log("Following users are found: ", email);
      // alert(`Login Credentials are:  ${cred}`);
    }
  };

  const handleDeleteData = async () => {
    try {
      let allKeys = await AsyncStorage.getAllKeys();

      if (allKeys.length === 0) {
        alert("0 credentials found");
        return;
      }
      for (const item of allKeys) {
        await AsyncStorage.removeItem(item);
      }

      let res = await AsyncStorage.getAllKeys();
      // if (allKeys.length === 0) alert("All Credentials deleted successfully");
      // else
      alert(`Inital Keys :${allKeys.length} || After Deletion:${res.length}`);
    } catch (error) {
      console.error("Failed to delete credentials from AsyncStorage", error);
      alert("Failed to delete credentials");
    }
  };

  async function handleCountAllData() {
    try {
      let allKeys = await AsyncStorage.getAllKeys();

      alert(`Total number of Keys : ${allKeys.length}`);
    } catch (error) {
      console.error("Failed to get credentials from AsyncStorage", error);
      alert("Failed to get credentials");
    }
  }
  return (
    <SafeAreaView style={styles.container}>
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
          errors,
          touched,
          isValid,
          setFieldValue,
        }) => (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={values.rememberMe ? "checked" : "unchecked"}
                onPress={
                  () => setFieldValue("rememberMe", !values.rememberMe) // Use setFieldValue here
                }
              />
              <Text>Keep me logged in</Text>
            </View>

            <Button
              title="Login"
              onPress={() => handleSubmit()}
              disabled={!isValid}
            />
            <View style={styles.btn}>
              <Button
                title="Count All Saved Credentails"
                onPress={() => handleCountAllData()}
              />
            </View>
            <View style={styles.btn}>
              <Button
                title="Remove All Saved Credentails"
                onPress={() => handleDeleteData()}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  btn: {
    marginTop: 5,
    backgroundColor: "red",
  },
});

export default LoginForm;
