import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import SignUp from "@/components/Signup";  // Import the SignUp component
import Login from "@/components/Login"; // Import the Login component

const Index = () => {
  const [isSignUp, setIsSignUp] = useState(true); // State to manage which form is displayed

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isSignUp ? "Sign Up Here" : "Login Here"}</Text>

      {/* Toggle between SignUp and Login */}
      {isSignUp ? <SignUp /> : <Login />}

      <View style={styles.buttonContainer}>
        <Button
          title={isSignUp ? "Go to Login" : "Go to Sign Up"}
          onPress={() => setIsSignUp(!isSignUp)} // Toggle between forms
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Index;
