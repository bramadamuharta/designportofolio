import arrowDown from '@/assets/props/arrow-down.svg';
import binderClip from '@/assets/props/binder-clip.svg';
import brushStroke from '@/assets/props/brush-stroke.svg';
import nail from '@/assets/props/nail.svg';
import paperClip from '@/assets/props/paper-clip.svg';
import pushPin from '@/assets/props/push-pin.svg';
import pushPin2 from '@/assets/props/push-pin-2.svg';
import washiLg from '@/assets/props/washi-tape-lg.svg';
import washiMd from '@/assets/props/washi-tape-md.svg';
import washiSm from '@/assets/props/washi-tape-sm.svg';
import wave from '@/assets/props/wave.svg';

/**
 * The scrapbook hardware: the clips, pins and tape that hold paper to the
 * board, exported from the Figma frame as SVG and used at the sizes it drew
 * them. Every one is decorative — the paper it fastens carries the meaning —
 * so each is hidden from assistive technology rather than given alt text.
 *
 * Intrinsic sizes are the SVG viewBoxes, passed through as width/height so the
 * browser reserves the box before the file lands.
 */
const PROPS = {
  'paper-clip': { src: paperClip, width: 29, height: 86 },
  'push-pin': { src: pushPin, width: 43, height: 46 },
  'push-pin-2': { src: pushPin2, width: 43, height: 46 },
  'binder-clip': { src: binderClip, width: 84, height: 84 },
  nail: { src: nail, width: 22, height: 23 },
  'washi-sm': { src: washiSm, width: 94, height: 27 },
  'washi-md': { src: washiMd, width: 154, height: 44 },
  'washi-lg': { src: washiLg, width: 174, height: 48 },
  'arrow-down': { src: arrowDown, width: 22, height: 30 },
  'brush-stroke': { src: brushStroke, width: 238, height: 69 },
  wave: { src: wave, width: 1346, height: 7 },
} as const;

export type PropName = keyof typeof PROPS;

export function Prop({
  name,
  className = '',
  style,
}: {
  name: PropName;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { src, width, height } = PROPS[name];

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={className}
      style={style}
    />
  );
}

/** Which prop fastens a given piece of paper, mapped from the content layer. */
export const FASTENER_PROP = {
  'paper-clip': 'paper-clip',
  'push-pin': 'push-pin',
  'push-pin-2': 'push-pin-2',
  'binder-clip': 'binder-clip',
  nail: 'nail',
  washi: 'washi-md',
} as const satisfies Record<string, PropName>;
