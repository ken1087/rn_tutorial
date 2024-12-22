import { View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Props = {
    // 이미지 사이즈
    imageSize: number;
    // 선택된 이모티콘
    stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    // hook 이미지 사이즈 초기화
    const scaleImage = useSharedValue(imageSize);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    /**
     * 더블탭 이벤트
     */
    const doubleTap = Gesture.Tap()
        // 더블 터치하면 onStart가 실행이 됨
        .numberOfTaps(2)
        .onStart(() => {
            // 사이즈가 2배가 됨
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
                // 사이즈가 원래대로 돌아옴
            } else {
                scaleImage.value = Math.round(scaleImage.value / 2);
            }
        });

    const drag = Gesture.Pan().onChange((event) => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    /**
     * 이미지 사이즈 재설정
     */
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    return (
        // GestureDetector 제스쳐 이벤트를 적용하기위함
        // Animated. 랑 함께 쓰는 듯
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        source={stickerSource}
                        resizeMode="contain"
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}
