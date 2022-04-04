import React from "react";
import { useGameState } from "../contexts/game";
import Square from "./Square";

interface IMapProps {}

const Map = ({}: IMapProps) => {
  const { map, isDone } = useGameState();
  if (map.length > 10 || map.length <= 0)
    return <h1>Largeur trop grande pour être affiché</h1>;
  if (!map.length && (map[0].length <= 0 || map[0].length > 10))
    return <h1>Hauteur trop grande pour être affiché</h1>;

  return (
    <div
      style={{
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <table
        style={{
          width: 500,
          height: 500,
          borderCollapse: "collapse",
          background: "#dee3e6",
          border: "solid",
          display: "table",
          tableLayout: "fixed",
        }}
      >
        <tbody style={{}}>
          {map.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                border: "solid",
                display: "table-row",
                height: 500 / map.length,
              }}
            >
              {row.map((cell, columnIdx) => (
                <Square square={cell} key={`${rowIdx}${columnIdx}`} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isDone && <h1>FINIT</h1>}
    </div>
  );
};

export default Map;
