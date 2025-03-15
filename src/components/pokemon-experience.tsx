import {
  Canvas,
  Circle,
  FontWeight,
  matchFont,
  Path,
  Skia,
  SweepGradient,
  Text,
  vec,
} from '@shopify/react-native-skia';
import {useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';

interface PokemonExperienceProps {
  baseExperience: number;
}
const _cavasSize = 70;
const _strokeWidth = 10;
const _circleRadius = (_cavasSize - _strokeWidth) / 2;
const _maxExperience = 563;

const fontFamily = Platform.select({ios: 'Helvetica', default: 'sans-serif'});
const fontStyle = {
  fontFamily,
  fontWeight: FontWeight.Bold,
  fontSize: 14,
};
const font = matchFont(fontStyle as any);

export function PokemonExperience({baseExperience}: PokemonExperienceProps) {
  const circleSkPath = useMemo(() => {
    const skPath = Skia.Path.Make();
    const center = _cavasSize / 2;
    skPath.addArc(
      {
        x: center - _circleRadius,
        y: center - _circleRadius,
        width: _circleRadius * 2,
        height: _circleRadius * 2,
      },
      -90, // Start at top
      360, // Full circle
    );
    return skPath;
  }, []);

  return (
    <Canvas style={styles.container}>
      <Circle
        cx={_cavasSize / 2}
        cy={_cavasSize / 2}
        r={_circleRadius}
        color="#eee"
        style={'stroke'}
        strokeWidth={_strokeWidth}
        strokeCap={'round'}
      />
      <Path
        path={circleSkPath}
        color="grey"
        style={'stroke'}
        strokeWidth={_strokeWidth}
        strokeCap={'round'}
        start={0}
        end={baseExperience / _maxExperience}>
        <SweepGradient
          c={vec(_cavasSize / 2, _cavasSize / 2)}
          colors={['cyan', 'yellow', 'magenta', 'cyan']}
        />
      </Path>
      <Text
        x={_cavasSize / 4}
        y={_cavasSize / 1.8}
        text={baseExperience.toString() + 'xp'}
        font={font}
      />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    width: _cavasSize,
    height: _cavasSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
