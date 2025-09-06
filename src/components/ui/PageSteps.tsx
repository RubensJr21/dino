import { ReactNode, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

interface PageStepsProps {
  pageIndex: number;
  children: ReactNode[];
}

export function PageSteps({ pageIndex, children }: PageStepsProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Para mudar quando o pageIndex 
    scrollRef.current?.scrollTo({ x: pageIndex * parentSize.width, animated: true })
  }, [pageIndex])

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: pageIndex * parentSize.width, animated: true })
  }, [parentSize])

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setParentSize({ width, height });
      }}
      scrollEnabled={false}
    >
      {children.map((element, index) => {
        return (
          <View key={index} style={{ ...parentSize }}>
            {element}
          </View>
        )
      })}
    </ScrollView>
  )
}