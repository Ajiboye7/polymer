import React from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface ScallopedViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const ScallopedView: React.FC<ScallopedViewProps> = ({ children, backgroundColor = "#184484" }) => {
  const circleCount = 13;
  const circleSize = 18.68;
  const circleSpacing = 9;
  const svgWidth = circleCount * (circleSize + circleSpacing);

  return (
    <View style={{ backgroundColor, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 }}>
      {children}

      {/* Scalloped SVG at the bottom */}
      <Svg width={svgWidth} height={circleSize}>
        {Array.from({ length: circleCount }).map((_, index) => (
          <Circle
            key={index}
            cx={index * (circleSize + circleSpacing) + circleSize / 2} // Add spacing between circles
            cy={circleSize} // Bring closer to the bottom
            r={circleSize / 2} // Radius for half-circles
            fill="white"
          />
        ))}
      </Svg>
    </View>
  );
};

export default ScallopedView;
