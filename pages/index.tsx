import { doc, DocumentData, DocumentSnapshot } from "firebase/firestore";
import LZString from "lz-string";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore, uploadPicture } from "../lib/firebase";

const Home: NextPage = () => {
  const [readPicRef, setReadPicRef] = useState<CanvasDraw | null>(null);

  const [picture, setPicture] = useState<string>();
  const [drawPicRef, setDrawPicRef] = useState<CanvasDraw | null>(null);

  const pictureId = "3Cu6YD1MXRDMw5BdNjqK";
  const docRef = doc(firestore, `pictures/${pictureId}`);
  const [picDoc] = useDocument(docRef);

  const clearDrawings = () => {
    drawPicRef?.clear();
    readPicRef?.clear();
    updatePicture();
  };

  const updatePicture = () => {
    if (!drawPicRef?.getSaveData) return;
    console.log("updating picture");
    const data = drawPicRef.getSaveData();
    setPicture(data);
  };

  const updatePicRef = async (
    ref: CanvasDraw | null,
    picDoc: DocumentSnapshot<DocumentData> | undefined
  ) => {
    if (!ref || !picDoc?.exists()) return;
    const decompressedPic = LZString.decompressFromBase64(
      picDoc.data().picture
    );
    ref.loadSaveData(decompressedPic ?? "");
  };

  useEffect(() => {
    if (!picture) return;
    uploadPicture(picture, pictureId);
  }, [picture]);

  useEffect(() => {
    updatePicRef(readPicRef, picDoc);
  }, [readPicRef, picDoc]);

  return (
    <>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h1>Sauradrawus</h1>
        <button
          style={{ fontSize: "1rem", padding: "0.25rem" }}
          onClick={clearDrawings}
        >
          Clear Drawings
        </button>
      </header>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "space-evenly",
        }}
      >
        <span>
          <h2>Draw Here</h2>
          <CanvasDraw
            gridColor="white"
            catenaryColor="red"
            ref={(r) => setDrawPicRef(r)}
            onChange={updatePicture}
            canvasWidth={700}
            canvasHeight={700}
            style={{ border: "2px solid black" }}
          />
        </span>
        <span>
          <h2>Watch Here</h2>
          <CanvasDraw
            gridColor="white"
            ref={(r) => setReadPicRef(r)}
            canvasWidth={700}
            canvasHeight={700}
            disabled
            style={{ border: "2px solid black" }}
          />
        </span>
      </div>
    </>
  );
};

export default Home;
