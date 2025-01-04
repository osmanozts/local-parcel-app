import { memo } from "react";
import { Field, ProfileCards } from "./ProfileCards";
import { Spacer, Stack, Text, XStack, YStack } from "tamagui";

export interface Category {
  icon: JSX.Element;
  title: string;
  fields: Field[];
}

export const ProfileCategories = memo(({ icon, title, fields }: Category) => {
  // Split the fields array into chunks of two
  const chunkedFields = fields.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as Field[][]);

  return (
    <Stack>
      <XStack alignItems="center" gap={4} marginBottom={8}>
        {icon}
        <Text fontSize={16} fontWeight="bold">
          {title}
        </Text>
      </XStack>
      <YStack space={8}>
        {chunkedFields.map((row, rowIndex) => (
          <XStack key={rowIndex} justifyContent="space-between">
            {row.map((field, fieldIndex) => (
              <ProfileCards key={fieldIndex} {...field} />
            ))}
            {/* Add an invisible card to maintain alignment if there's only one card in the row */}
            {row.length < 2 && <Spacer flex={1} />}
          </XStack>
        ))}
      </YStack>
      <Spacer size={20} />
    </Stack>
  );
});
