import React, {
  useCallback,
  useMemo,
  useState,
  MouseEvent,
  WheelEvent,
} from "react";
import styles from "./App.module.scss";
// We use topojson here because it's much more compact than geojson
import countriesTopoJson from "./countries-50m.json";
import { feature } from "topojson-client";
import { geoPath, geoAzimuthalEquidistant } from "d3-geo";
import * as turf from "@turf/turf";
import citiesJson from "./cities";
import cn from "classnames";
const countriesGeoJson = feature(
  countriesTopoJson as any,
  countriesTopoJson.objects.countries as any,
);

// const EARTH_RADIUS_MILES = 3963;
const EARTH_CIRCUMFERENCE_MILES = 24901;

function WorldMap({ width, height }: { width: number; height: number }) {
  const [centerCity, setCenterCity] =
    useState<(typeof citiesJson)[number]["city"]>("New York City");
  const center = useMemo(
    () => citiesJson.find((c) => c.city === centerCity)!.coordinates,
    [centerCity],
  );
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);

  const geoToSvgCoords = useMemo(
    () =>
      geoAzimuthalEquidistant()
        .rotate([-center[0], -center[1]])
        .scale(Math.min(width, height) / 6.5)
        .translate([width / 2, height / 2]),
    [center, width, height],
  );

  const geoPathToSvgPath = useMemo(
    () => geoPath(geoToSvgCoords),
    [geoToSvgCoords],
  );

  const countriesPath = useMemo(
    () => geoPathToSvgPath(countriesGeoJson) || "",
    [geoPathToSvgPath],
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
        geoPathToSvgPath(
          turf.circle(center, distance, {
            steps: 360,
            units: "miles",
          }),
        ) || "",
      labelPoint: geoToSvgCoords(
        turf.destination(center, distance, 0, { units: "miles" }).geometry
          .coordinates as [number, number],
      )!,
      distance,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoPathToSvgPath, center]);

  const radiatingPaths = useMemo(() => {
    const angles: number[] = [];
    for (let angle = -180; angle <= 180; angle = angle + 5) {
      angles.push(angle);
    }

    const angles2: number[] = [];
    for (let angle = -90; angle <= 90; angle = angle + 5) {
      angles2.push(angle);
    }

    return {
      longitudes: angles.map((lon) => ({
        path: geoPathToSvgPath(
          turf.lineChunk(
            turf.lineString(angles2.map((lat) => [lon - 180, lat])),
            15,
          ),
        )!,

        // geoPathToSvgPath(
        //   turf.lineChunk(
        //     turf.lineString([
        //       center,
        //       turf.destination(center, EARTH_CIRCUMFERENCE_MILES / 2, angle, {
        //         units: "miles",
        //       }).geometry.coordinates,
        //     ]),
        //     15,
        //   ),
        // ) || "",
        longitude: lon,
      })),
      latitudes: angles2.map((lat) => ({
        path: geoPathToSvgPath(
          turf.lineChunk(
            turf.lineString(angles.map((lon) => [lon - 180, lat])),
            15,
          ),
        )!,

        // geoPathToSvgPath(
        //   turf.lineChunk(
        //     turf.lineString([
        //       center,
        //       turf.destination(center, EARTH_CIRCUMFERENCE_MILES / 2, angle, {
        //         units: "miles",
        //       }).geometry.coordinates,
        //     ]),
        //     15,
        //   ),
        // ) || "",
        latitude: lat,
      })),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoPathToSvgPath, center]);

  const ocean = useMemo(
    () =>
      geoPathToSvgPath(
        // SVG fill in combination with the projection does weird things and fills outside of the circle so we need to make it as small as possible
        turf.circle([0, 0], 0.01, {
          steps: 360,
          units: "miles",
        }),
      ) || "",
    [geoPathToSvgPath],
  );

  const cities = useMemo(
    () =>
      citiesJson.map(({ city, coordinates }) => {
        const svgCoords = geoToSvgCoords(coordinates);
        return {
          city,
          cx: svgCoords![0],
          cy: svgCoords![1],
        };
      }),
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
      const rawZoomFactor = e.deltaY > 0 ? 0.8 : 1.2;
      const newScale = Math.max(0, Math.min(20, scale * rawZoomFactor), 0.75);
      const zoomFactor = newScale / scale;

      const svgRect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;

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
        <g>
          <path className={styles.ocean} d={ocean} />
          <path className={styles.countries} d={countriesPath} />
        </g>
        <g>
          {distanceCircles.map(({ path, distance, labelPoint }) => {
            return (
              <g
                className={cn(styles.distanceCircle, {
                  [styles.active]: distance === selectedDistance,
                })}
                key={distance}
              >
                <path d={path} />
                <text
                  x={labelPoint[0]}
                  y={labelPoint[1] - 8 / Math.max(5, scale)}
                  fontSize={20 / Math.max(5, scale)}
                  onClick={() =>
                    distance !== selectedDistance
                      ? setSelectedDistance(distance)
                      : setSelectedDistance(null)
                  }
                >
                  {distance.toLocaleString()} Miles
                </text>
              </g>
            );
          })}
        </g>
        <g>
          {radiatingPaths.longitudes.map(({ path, longitude }) => {
            return (
              <g className={styles.radiatingPath} key={longitude}>
                <path d={path} />
              </g>
            );
          })}
          {radiatingPaths.latitudes.map(({ path, latitude }) => {
            return (
              <g className={styles.radiatingPath} key={latitude}>
                <path d={path} />
              </g>
            );
          })}
        </g>
        <g>
          {cities.map(({ city, cx, cy }) => {
            const active = centerCity === city;
            const circleScale = (active ? 18 : 10) / Math.max(5, scale);
            return (
              <g
                className={cn(styles.cityPoint, {
                  [styles.active]: active,
                })}
              >
                <circle
                  key={city}
                  cx={cx}
                  cy={cy}
                  r={circleScale}
                  onClick={() => setCenterCity(city)}
                />
                <g transform={`translate(${1.75 * circleScale}, 0)`}>
                  <text
                    x={cx}
                    y={cy}
                    fontSize={(active ? 35 : 20) / Math.max(5, scale)}
                    onClick={() => setCenterCity(city)}
                  >
                    {city}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
}

function App() {
  return (
    <div className={styles.App}>
      <WorldMap width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
}

export default App;
