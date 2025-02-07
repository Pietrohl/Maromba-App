import React from "react";
import { Button, Group } from "tamagui";
import { FontAwesome6 } from "@expo/vector-icons";
import { Share } from "react-native";
import { router } from "expo-router";
import { useRoute, NavigationState } from "@react-navigation/native";

type AppHeaderParams = {
  handleEdit?: () => void;
  handleCopy?: () => void;
  sharable?: boolean;
  relativeUrl?: string;
};

const shareText = async (text?: string, params?: Readonly<object>) => {
  let message = "https://maromba.dev/";

  if (text) {
    message = new URL(text, message).href;
    if (params)
      Object.entries(params).forEach(([key, value]) => {
        message = message.replace(`[${key}]`, value.toString());
      });
  }

  try {
    await Share.share({
      message,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

const AppHeaderButtons: React.FC<AppHeaderParams> = ({
  handleEdit = () => {},
  handleCopy = () => {},
  sharable,
  relativeUrl,
}) => {
  const route = useRoute();
  console.log("Route: ", route);
  return (
    <Group orientation="horizontal">
      <Group.Item>
        <Button
          backgroundColor="$color.gray1Light"
          onPress={handleEdit}
          icon={<FontAwesome6 size={16} name="edit" color="black" />}
        ></Button>
      </Group.Item>
      {sharable && (
        <Group.Item>
          <Button
            backgroundColor="$color.gray1Light"
            onPress={() => shareText(relativeUrl || route.name, route.params)}
            icon={<FontAwesome6 size={16} name="share-square" color="black" />}
          ></Button>
        </Group.Item>
      )}
      <Group.Item>
        <Button
          backgroundColor="$color.gray1Light"
          onPress={handleCopy}
          icon={<FontAwesome6 size={16} name="copy" color="black" />}
        ></Button>
      </Group.Item>
    </Group>
  );
};

export default AppHeaderButtons;
