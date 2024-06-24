import * as React from "react";
import { Image, View, useWindowDimensions } from "react-native";
import Carousel, { CarouselRenderItem } from "react-native-reanimated-carousel";

interface ProductCarouselProps {
  images: string[];
  renderItem?: CarouselRenderItem<any>;
}

function ImageCarousel({ images, renderItem }: ProductCarouselProps) {
  const width = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = React.useState(0);

  // console.log("images", images);

  return (
    <View className=" flex-col h-80 mt-4 relative items-center">
      <Carousel
        loop
        width={width - 50}
        height={width / 1.7}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={2000}
        onSnapToItem={(index: number) => {
          setActiveIndex(index);
          // console.log("current index:", index);
        }}
        renderItem={
          renderItem ??
          (({ index }) => (
            <Image
              key={index}
              resizeMode="cover"
              className="object-cover w-full h-full"
              source={{ uri: images[0] }}
            />
          ))
        }
        key={images.length}
      />
      <View className="flex-row absolute bottom-2 gap-x-2">
        {images.map((item, index) => (
          <View
            key={index}
            className={`w-2 h-2 mt-2 rounded-full ${
              index === activeIndex ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
}

export default ImageCarousel;
