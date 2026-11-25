import { Circle, Line, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createSignal,
  easeInOutCubic,
  easeOutExpo,
  tween,
  waitFor,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill("#0A0A0C");

  const card = createRef<Rect>();
  const ring = createRef<Circle>();
  const line = createRef<Line>();
  const label = createRef<Txt>();
  const progress = createSignal(0);

  view.add(
    <>
      <Circle
        ref={ring}
        size={420}
        stroke="#22D3EE"
        lineWidth={3}
        lineDash={[12, 10]}
        opacity={0}
      />
      <Rect
        ref={card}
        width={560}
        height={240}
        radius={28}
        fill="#141418"
        stroke="#6366F1"
        lineWidth={3}
        scale={0.7}
        opacity={0}
      >
        <Txt
          ref={label}
          text={() => `MOTION CANVAS · ${Math.round(progress() * 100)}%`}
          fill="#FFFFFF"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight={700}
          fontSize={32}
          letterSpacing={2}
        />
      </Rect>
      <Line
        ref={line}
        points={[
          [-260, 180],
          [260, 180],
        ]}
        stroke="#22D3EE"
        lineWidth={4}
        end={0}
        lineCap="round"
      />
    </>
  );

  yield* all(
    card().opacity(1, 0.5, easeOutExpo),
    card().scale(1, 0.7, easeOutExpo),
    ring().opacity(0.65, 0.6),
    ring().rotation(90, 2.2, easeInOutCubic),
    line().end(1, 1.1, easeOutExpo),
    tween(1.4, (value) => {
      progress(easeInOutCubic(value));
    })
  );

  yield* chain(
    all(
      card().width(640, 0.5, easeInOutCubic),
      card().stroke("#22D3EE", 0.5),
      ring().scale(1.18, 0.6, easeOutExpo)
    ),
    waitFor(0.4)
  );
});
