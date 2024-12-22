import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
    label: string;
    theme?: "primary";
};

export default function Button({ label, theme }: Props) {
    if (theme === "primary") {
        return (
            <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
                {/* React Native에는 터치 이벤트를 처리하기 위한 몇 가지 다른 구성 요소가 포함되어 있지만 
                <Pressable>유연성 때문에 권장됩니다. 단일 탭, 긴 누름을 감지하고, 
                버튼을 눌렀다 놓으면 별도의 이벤트를 트리거하는 등의 작업을 수행할 수 있습니다. */}
                <Pressable
                    style={[styles.button, { backgroundColor: "#fff" }]}
                    onPress={() => alert("You pressed a button.")}
                >
                    <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
                    <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => alert("You pressed a button.")}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16,
    },
});
