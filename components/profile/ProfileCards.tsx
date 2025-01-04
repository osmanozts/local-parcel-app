import { memo } from "react";
import { Card, Text } from "tamagui";

export interface Field {
  label: string;
  value: string | undefined | null;
}

export const ProfileCards = memo(({ label, value }: Field) => (
  <Card
    flex={1}
    borderRadius={8}
    padding={8}
    backgroundColor="#F8F9FA"
    margin={4}
    alignItems="center"
    justifyContent="center"
  >
    <Text fontSize={12} fontWeight="bold" color="#343A40" textAlign="center">
      {label}
    </Text>
    <Text fontSize={12} color="#495057" textAlign="center">
      {value || "N/V"}
    </Text>
  </Card>
));
