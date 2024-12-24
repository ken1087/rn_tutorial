import { View, StyleSheet, Platform } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import { type ImageSource } from "expo-image";
import EmojiSticker from "@/components/EmojiSticker";
import EmojiList from "@/components/EmojiList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

// 이미지 가져오기
const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
    // 스크린샷할 부분 참조
    const imageRef = useRef<View>(null);

    // 미디어에 접근 상태
    const [status, requestPermission] = MediaLibrary.usePermissions();

    // status가 null인 경우, 접근 허가할 것인지 모달 표시
    if (status === null) {
        requestPermission();
    }

    // 선택한 이미지 상태
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    // Option 상태
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

    // 이모티콘 선택 모달 표시 상태
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    // 선택한 이모티콘
    const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

    /**
     * 사진첩에서 사진 픽 해오기
     */
    const pickImageAsync = async () => {
        // 다양한 옵션을 지정하기 위한 객체를 받습니다.
        // 이 객체는 메소드 ImagePickerOptions를 호출할 때 전달하는 객체
        /** 아래와 같은 결과를 반환
         * {
            "assets": [
              {
                "assetId": "99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7/L0/001",
                "base64": null,
                "duration": null,
                "exif": null,
                "fileName": "IMG_0004.JPG",
                "fileSize": 2548364,
                "height": 1669,
                "mimeType": "image/jpeg",
                "type": "image",
                "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FStickerSmash-13f21121-fc9d-4ec6-bf89-bf7d6165eb69/ImagePicker/ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
                "width": 1668
              }
            ],
            "canceled": false
          }
         */
        let result = await ImagePicker.launchImageLibraryAsync({
            // 미디어 타입
            mediaTypes: ["images"],
            // true로 설정되어 있는 경우, 사용자는 android, ios에서
            // 이미지를 자를 수 있음
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert("You did not select any image.");
        }
    };

    const onReset = () => {
        setShowAppOptions(false);
    };

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    /**
     * 저장하기
     */
    const onSaveImageAsync = async () => {
        if (Platform.OS !== "web") {
            try {
                const localUri = await captureRef(imageRef, {
                    height: 440,
                    quality: 1,
                });

                await MediaLibrary.saveToLibraryAsync(localUri);
                if (localUri) {
                    alert("Saved!");
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            // Web인 경우 대응
            try {
                // @ts-ignore
                const dataUrl = await domtoimage.toJpeg(imageRef.current, {
                    quality: 0.95,
                    width: 320,
                    height: 440,
                });

                let link = document.createElement("a");
                link.download = "sticker-smash.jpeg";
                link.href = dataUrl;
                link.click();
            } catch (e) {
                console.log(e);
            }
        }
    };
    return (
        // 제스처 상호작용을 작동을 시키기 위함
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>
                <View ref={imageRef} collapsable={false}>
                    <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                    {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
                </View>
            </View>
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon="refresh" label="Reset" onPress={onReset} />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
                    <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
                </View>
            )}
            {/* 이모티콘 선택창이 열림 */}
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
            </EmojiPicker>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
    },
    imageContainer: {
        flex: 1,
        paddingTop: 28,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
    },
    optionsContainer: {
        position: "absolute",
        bottom: 80,
    },
    optionsRow: {
        alignItems: "center",
        flexDirection: "row",
    },
});
