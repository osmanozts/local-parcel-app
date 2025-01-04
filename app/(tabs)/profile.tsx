import { Category, ProfileCategories } from "@/components/profile";
import { CustomAvatarImage } from "@/components/ui";
import { useAuth } from "@/providers/auth-provider";
import {
  EmployeeWithProfile,
  getEmployeeProfile,
} from "@/supabase-utils/backend-functions";
import {
  BriefcaseBusiness,
  CircleUser,
  IdCard,
  LogOut,
} from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaViewComponent } from "react-native";
import {
  Button,
  ScrollView,
  Spacer,
  Text,
  useTheme,
  XStack,
  YStack,
} from "tamagui";

const ProfileTabScreen = () => {
  const theme = useTheme();

  const { user, signOut } = useAuth();
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeWithProfile | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      setLoading(true);
      try {
        const employeeResult = await getEmployeeProfile(user.id);
        setEmployeeInfo(employeeResult);
      } catch (error) {
        console.error("Fehler beim Laden der Mitarbeiterinformationen:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeInfo();
  }, [user]);

  const categories: Category[] = [
    {
      icon: <CircleUser color="$dark" />,
      title: "Persönliche Informationen",
      fields: [
        {
          label: "Geburtsdatum",
          value: dayjs(employeeInfo?.date_of_birth).format("DD.MM.YYYY"),
        },
        { label: "Nationalität", value: employeeInfo?.nationality },
        { label: "Steuer-ID", value: employeeInfo?.tax_id },
        { label: "Steuerklasse", value: employeeInfo?.tax_level },
        {
          label: "Führerscheinklasse",
          value: employeeInfo?.driver_license_level,
        },
        {
          label: "Führerschein gültig bis",
          value: dayjs(employeeInfo?.driver_license_end_date).format(
            "DD.MM.YYYY"
          ),
        },
        {
          label: "Ausweis gültig bis",
          value: dayjs(employeeInfo?.id_card_end_date).format("DD.MM.YYYY"),
        },
        { label: "Krankenversicherung", value: employeeInfo?.health_insurance },
      ],
    },
    {
      icon: <IdCard color="$dark" />,
      title: "Kontaktinformationen",
      fields: [
        { label: "E-Mail", value: employeeInfo?.profile.email },
        { label: "Handynummer", value: employeeInfo?.mobile },
        { label: "Straße", value: employeeInfo?.street },
        { label: "Stadt", value: employeeInfo?.city },
        { label: "Postleitzahl", value: employeeInfo?.postal_code },
      ],
    },
    {
      icon: <BriefcaseBusiness color="$dark" />,
      title: "Arbeitsinformationen",
      fields: [
        { label: "Personalnummer", value: employeeInfo?.personnel_number },
        { label: "Abteilung", value: employeeInfo?.department },
        { label: "Standort", value: employeeInfo?.location },
        { label: "Status", value: employeeInfo?.state },
      ],
    },
  ];

  if (loading) {
    return (
      <YStack alignItems="center" justifyContent="center" flex={1}>
        <Text fontSize={18} color="$accent">
          Lade Daten...
        </Text>
      </YStack>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.backgroundColor?.val }}
    >
      <YStack
        padding={16}
        height="100%"
        justifyContent="space-between"
        backgroundColor="$bg"
      >
        {user && employeeInfo ? (
          <ScrollView>
            <YStack alignItems="center" marginTop={20}>
              <CustomAvatarImage employee_id={employeeInfo.personnel_number} />
              <Text fontSize={22} fontWeight="bold" marginTop={16}>
                {employeeInfo?.first_name && employeeInfo?.last_name
                  ? `${employeeInfo.first_name} ${employeeInfo.last_name}`
                  : "N/V"}
              </Text>
              <XStack alignItems="center" gap={4}>
                <IdCard color="$disabled" />
                <Text fontSize={16} color="#6C757D">
                  {employeeInfo?.personnel_number ?? "N/V"}
                </Text>
              </XStack>
            </YStack>

            <Spacer size={20} />
            {categories.map((category, index) => (
              <ProfileCategories key={index} {...category} />
            ))}

            <YStack alignItems="center" marginTop={32}>
              <Button
                backgroundColor="$accent"
                color="white"
                onPress={signOut}
                width="70%"
                height={50}
                borderRadius={10}
                icon={<LogOut color="white" />}
              >
                Abmelden
              </Button>
            </YStack>
          </ScrollView>
        ) : (
          <YStack alignItems="center" justifyContent="center" flex={1}>
            <Text fontSize={18} color="$accent">
              {!user && "Nutzer nicht authentifiziert."}
              {!employeeInfo && "Mitarbeiter nicht gefunden."}
            </Text>
          </YStack>
        )}
      </YStack>
    </SafeAreaView>
  );
};

export default ProfileTabScreen;
