import React, { useEffect } from "react";
import { Button, Input, Spacer, Stack, Text, YStack } from "tamagui";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSystem } from "@/hooks/useSystem";
import { router } from "expo-router";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

function SignIn() {
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn, loading, session, signInWithGoogle } = useSystem();
  const onSubmit: SubmitHandler<{ email: string; password: string }> = (
    data
  ) => {
    signIn(data.email, data.password);
  };

  
  useEffect(() => {
    if (session) router.replace("/");
  }, [session]);
  
  if (loading) return <Text>Loading...</Text>;

  
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding={16}>
      <Stack space>
        <Text fontSize={24} fontWeight="bold">
          Login
        </Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              onBlur={() => {
                onBlur();
                trigger("email");
              }}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />
        {errors.email && <Text color="red">{errors.email.message}</Text>}
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              onBlur={() => {
                onBlur();
                trigger("password");
              }}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text color="red">{errors.password.message}</Text>}
        <Spacer size="$4" />
        <Button onPress={handleSubmit(onSubmit)}>Login</Button>
      </Stack>

      <Stack>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
        />
      </Stack>
    </YStack>
  );
}

export default SignIn;
