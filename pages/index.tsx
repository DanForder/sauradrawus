import type { NextPage } from "next";
import { Ref, useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";

const Home: NextPage = () => {
  const [picture, setPicture] = useState<string>();
  const [ref, setRef] = useState<CanvasDraw | null>(null);

  const updatePicture = () => {
    if (!ref?.getSaveData) return;
    console.log("updating picture");
    const data = ref.getSaveData();
    setPicture(data);
  };

  return (
    <>
      <h1>Sauradrawus</h1>
      <CanvasDraw
        gridColor="rgba(0,0,0)"
        catenaryColor="red"
        ref={(r) => setRef(r)}
        onChange={updatePicture}
      />
    </>
  );
};

export default Home;
