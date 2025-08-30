import React, {
  useCallback,
  useMemo,
  useState,
  MouseEvent,
  WheelEvent,
} from "react";
import "./App.css";
// We use topojson here because it's much more compact than geojson
import countriesTopoJson from "./countries-50m.json";
import { feature } from "topojson-client";
import { geoPath, geoAzimuthalEquidistant } from "d3-geo";
import * as turf from "@turf/turf";

const countriesGeoJson = feature(
  countriesTopoJson as any,
  countriesTopoJson.objects.countries as any,
);

// const EARTH_RADIUS_MILES = 3963;
const EARTH_CIRCUMFERENCE_MILES = 24901;

function WorldMap({
  width,
  height,
  center,
}: {
  width: number;
  height: number;
  center: [number, number]; // Longitude and Latitude
}) {
  const geoToSvgCoords = useMemo(
    () =>
      geoPath(
        geoAzimuthalEquidistant()
          .rotate([center[0], center[1]])
          .scale(Math.min(width, height) / 6.5)
          .translate([width / 2, height / 2]),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [center[0], center[1], width, height],
  );

  const countriesPath = useMemo(
    () => geoToSvgCoords(countriesGeoJson) || "",
    [geoToSvgCoords],
  );

  const distanceCircles = useMemo(() => {
    const distances = [];
    for (
      let distance = 500;
      distance < EARTH_CIRCUMFERENCE_MILES / 2;
      distance = distance + 500
    ) {
      distances.push(distance);
    }

    return distances.map((distance) => ({
      path:
        geoToSvgCoords(
          turf.circle([center[0], center[1]], distance, {
            steps: 360,
            units: "miles",
          }),
        ) || "",
      distance,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoToSvgCoords, center[0], center[1]]);

  const ocean = useMemo(
    () =>
      geoToSvgCoords(
        // SVG fill in combination with the projection does weird things and fills outside of the circle so we need to make it as small as possible
        turf.circle([0, 0], 0.01, {
          steps: 360,
          units: "miles",
        }),
      ) || "",
    [geoToSvgCoords],
  );

  const [currentPan, setCurrentPan] = useState<{
    startX: number;
    starY: number;
    dx: number;
    dy: number;
  } | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const startPan = useCallback(
    (e: MouseEvent<SVGElement>) => {
      setCurrentPan({ startX: e.clientX, starY: e.clientY, dx: 0, dy: 0 });
    },
    [setCurrentPan],
  );
  const handlePan = useCallback(
    (e: MouseEvent<SVGElement>) => {
      if (!currentPan) {
        return false;
      }
      const dx = e.clientX - currentPan.startX;
      const dy = e.clientY - currentPan.starY;
      setCurrentPan({ ...currentPan, dx, dy });
    },
    [currentPan],
  );
  const endPan = useCallback(() => {
    if (currentPan) {
      setTranslate((translate) => ({
        x: translate.x + currentPan.dx,
        y: translate.y + currentPan.dy,
      }));
    }
    setCurrentPan(null);
  }, [currentPan, setCurrentPan]);

  const [scale, setScale] = useState(1);
  const handleScale = useCallback(
    (e: WheelEvent<SVGElement>) => {
      const zoomFactor = e.deltaY > 0 ? 0.8 : 1.2;

      const svgRect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;

      const newScale = scale * zoomFactor;
      const newTranslateX = mouseX - (mouseX - translate.x) * zoomFactor;
      const newTranslateY = mouseY - (mouseY - translate.y) * zoomFactor;

      setScale(newScale);
      setTranslate({ x: newTranslateX, y: newTranslateY });
    },
    [scale, setScale, translate, setTranslate],
  );

  return (
    <svg
      width={width}
      height={height}
      onMouseDown={startPan}
      onMouseMove={handlePan}
      onMouseUp={endPan}
      onWheel={handleScale}
      cursor={currentPan ? "grabbing" : "grab"}
    >
      <g
        transform={`translate(${translate.x + (currentPan?.dx || 0)},${translate.y + (currentPan?.dy || 0)}) scale(${scale})`}
      >
        <path d={ocean} fill="#f2fffe" stroke="#999" strokeWidth={0.5} />
        <path d={countriesPath} fill="#ddd" stroke="#999" strokeWidth={0.5} />
        {distanceCircles.map(({ path, distance }) => (
          <path
            key={distance}
            d={path}
            fill="none"
            stroke="#ccc"
            strokeWidth={0.5}
          />
        ))}
      </g>
    </svg>
  );
}

function App() {
  return (
    <div className="App">
      <WorldMap
        width={window.innerWidth}
        height={window.innerHeight}
        center={[0, 0]}
      />
    </div>
  );
}

export default App;
