import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = PropsWithChildren<{
    // 모달의 가시성 상태를 결정하는 Boolean 값
    isVisible: boolean;
    // 모달을 닫는 기능
    onClose: () => void;
}>;

/**
 *
 * @param isVisible 모달이 열려 있는지 닫혀 있는지를 제어
 * @param children 이모티콘 목록을 표시하는 데 사용
 * @param onClose 모달을 닫는 기능
 * @returns
 */
export default function EmojiPicker({ isVisible, children, onClose }: Props) {
    return (
        // Modal: 구성 요소는 제목과 닫기 버튼을 표시
        // transparent: 모달이 전체 뷰를 채우는지 여부를 결정하는 값
        // animationType: 화면에 어떻게 들어오고 나가는지 결정합니다. slide인 경우, 화면 하단에서 미끄러집
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a sticker</Text>
                    {/* 사용자가 닫기 버튼을 누르면, 닫히는 함수 실행 */}
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                {/* 이모티콘 목록을 표시하는 데 사용 */}
                {children}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: "25%",
        width: "100%",
        backgroundColor: "#25292e",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "16%",
        backgroundColor: "#464C55",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 16,
    },
});
