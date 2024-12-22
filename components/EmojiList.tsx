import { useState } from "react";
import { StyleSheet, FlatList, Platform, Pressable } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
    onSelect: (image: ImageSource) => void;
    onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
    const [emoji] = useState<ImageSource[]>([
        require("../assets/images/emoji1.png"),
        require("../assets/images/emoji2.png"),
        require("../assets/images/emoji3.png"),
        require("../assets/images/emoji4.png"),
        require("../assets/images/emoji5.png"),
        require("../assets/images/emoji6.png"),
    ]);

    return (
        <FlatList
            // 수평으로 렌더링
            horizontal
            // React Native의 Platform모듈을 사용하여 값을 확인하고 웹에 수평 스크롤 막대를 표시
            showsHorizontalScrollIndicator={Platform.OS === "web"}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSelect(item);
                        onCloseModal();
                    }}
                >
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});
