import '@azure/core-asynciterator-polyfill';
import { Link, useRouter } from "expo-router";
import {
  Button,
  H1,
  ListItem,
  Paragraph,
  Separator,
  YGroup,
  YStack,
} from "tamagui";

import { MySafeAreaView } from "@/components/MySafeAreaView";
import { MyStack } from "@/components/MyStack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ExternalLink } from "@/components/ExternalLink";

export default function Home() {
  const router = useRouter();

  return (
    <MySafeAreaView>
      <MyStack>
        <YStack maxWidth={600}>
          <H1 textAlign="center">Welcome to Tamagui.</H1>
          <Paragraph textAlign="center">
            Here&apos;s a basic starter to show navigating from one screen to
            another.
          </Paragraph>
        </YStack>

        <YStack space="$2.5">
          <Button onPress={() => router.push("/tabs")}>Go to user page</Button>
          <Button onPress={() => router.push("/_sitemap")}>
            Go to tabs page
          </Button>
        </YStack>

        <YStack space="$5">
          <YGroup bordered separator={<Separator />} theme="green">
            <YGroup.Item>
              <ExternalLink
                asChild
                href="https://twitter.com/natebirdman"
                target="_blank"
              >
                <ListItem
                  hoverTheme
                  title="Nate"
                  pressTheme
                  icon={<Ionicons size={28} name="logo-twitter" />}
                />
              </ExternalLink>
            </YGroup.Item>
            <YGroup.Item>
              <ExternalLink
                asChild
                href="https://github.com/tamagui/tamagui"
                target="_blank"
              >
                <ListItem
                  hoverTheme
                  pressTheme
                  title="Tamagui"
                  icon={<Ionicons size={28} name="logo-github" />}
                />
              </ExternalLink>
            </YGroup.Item>
            <YGroup.Item>
              <ExternalLink
                asChild
                href="https://github.com/ivopr/tamagui-expo"
                target="_blank"
              >
                <ListItem
                  hoverTheme
                  pressTheme
                  title="This Template"
                  icon={<Ionicons size={28} name="logo-github" />}
                />
              </ExternalLink>
            </YGroup.Item>
          </YGroup>
        </YStack>
      </MyStack>
    </MySafeAreaView>
  );
}
