import BaseView from "@/components/BaseView";
import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Root(){
    return (
        <BaseView>
            <Text variant="headlineMedium">Bem vindo ao Tabs</Text>
            <Link href={"/expenses"} asChild>
                <Button mode="contained">
                    Ir para Tab
                </Button>
            </Link>
        </BaseView>
    )
}