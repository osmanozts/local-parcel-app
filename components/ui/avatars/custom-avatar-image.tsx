import { supabaseClient } from "@/supabase-utils/supabase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Image, Text, YStack } from "tamagui";

interface CustomAvatarImageProps {
  employee_id: string;
  isSmall?: boolean;
}

export const CustomAvatarImage = ({
  employee_id,
  isSmall,
}: CustomAvatarImageProps) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfilePic = async () => {
      setIsLoading(true);

      try {
        const { data, error } = await supabaseClient.storage
          .from("dateien_mitarbeiter")
          .list(employee_id);

        if (error) throw error;

        const profilePicExists = data?.some(
          (file) => file.name === "profile_pic.jpg"
        );

        if (profilePicExists) {
          const { data: signedUrlData, error: urlError } =
            await supabaseClient.storage
              .from("dateien_mitarbeiter")
              .createSignedUrl(`${employee_id}/profile_pic.jpg`, 180 * 3);

          if (urlError) throw urlError;

          setProfilePicUrl(signedUrlData?.signedUrl || null);
        } else {
          setProfilePicUrl(null);
        }
      } catch (err) {
        console.error("Error fetching profile picture:", err);
        setProfilePicUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfilePic();
  }, [employee_id]);

  return (
    <YStack
      width={isSmall ? 60 : 150}
      height={isSmall ? 60 : 150}
      borderRadius={9999} // Für die kreisförmige Darstellung
      overflow="hidden"
      backgroundColor="#e2e8f0"
      justifyContent="center"
      alignItems="center"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.25}
      shadowRadius={3.84}
      elevation={5}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : profilePicUrl ? (
        <Image
          source={{ uri: profilePicUrl }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 9999, // Kreisförmiges Bild
          }}
          objectFit="cover"
        />
      ) : (
        <YStack justifyContent="center" alignItems="center" height="100%">
          <Text color="#4A5568" fontSize={isSmall ? 12 : 16}>
            Kein Bild
          </Text>
        </YStack>
      )}
    </YStack>
  );
};
