import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { View, Text, Image, Button, Input, Stack } from "tamagui";
import logo from "../../assets/images/lp-logistics.png"; // Importiere das Bild
import { InputField } from "@/components/ui";
import { Mail, Lock } from "@tamagui/lucide-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    try {
      await login(email, password);
    } catch (error: any) {
      const errorMessage = error;

      if (errorMessage.includes("Invalid login credentials")) {
        setError("Falsche Anmeldedaten. Bitte versuchen Sie es erneut.");
      } else {
        setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        flex={1}
        justifyContent="center"
        padding={18}
        margin={18}
        backgroundColor="tileBgColor"
      >
        <Stack alignItems="center" gap="$4">
          <View width="70%" justifyContent="center">
            <Image
              src={logo}
              alt="Logo"
              objectFit="contain"
              width={200}
              height={100}
            />
          </View>

          <InputField
            value={email}
            placeholder="Email..."
            onChange={setEmail}
            icon={<Mail color="$disabled" />}
          />

          <InputField
            value={password}
            placeholder="Passwort"
            isPasswordField
            icon={<Lock color="$disabled" />}
            onChange={setPassword}
          />

          <Button
            marginTop="$4"
            backgroundColor="$accent"
            color="$invertedTextColor"
            onPress={handleLogin}
            width={120}
            height={50}
            borderRadius={8}
          >
            Anmelden
          </Button>

          {/* Info/Error Text */}
          <Text fontSize="$sm" color="$disabledText" marginTop="$2">
            Bitte geben Sie Ihre Anmeldedaten ein.
          </Text>
        </Stack>
      </View>
    </TouchableWithoutFeedback>
  );
}
