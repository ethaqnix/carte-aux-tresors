import React, { useState } from "react";
import Map from "../../components/Map";
import Message from "../../components/Message";
import { useGame } from "../../contexts/game";
import { parseFile } from "../../helpers/parser";

const Game = () => {
  const [gameState, { dispatch, run, setGame, goToEnd }] = useGame();
  const [errors, setErrors] = useState<string[]>([]);
  const [content, setContent] = useState<string>();
  let selectedFile: any;

  const handleRun = () => {
    run();
  };

  const handleFileRead = () => {
    if (!selectedFile) return;
    const content = parseFile(selectedFile.result);
    if (content.errors) {
      setErrors(content.errors);
    } else {
      setContent(selectedFile.result);
      setGame(content);
    }
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let file = new FileReader();
      selectedFile = file;
      file.onloadend = handleFileRead;
      file.readAsText(e.target.files[0]);
    }
  };

  const changeContent = (updatedContent: string) => {
    const content = parseFile(updatedContent);
    if (content.errors) {
      setErrors(content.errors);
    } else {
      setGame(content);
    }
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    changeContent(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "grey",
        flex: 1,
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "aliceblue",
          flex: 1,
          margin: "1em",
          padding: "1em",
        }}
      >
        <input type="file" onChange={handleSelectFile} />
        <textarea rows={10} value={content} onChange={handleChangeContent} />
        <Message type="error" messages={errors} />
        <button onClick={handleRun} disabled={!gameState.isReady}>
          RUN
        </button>
        <button
          disabled={!gameState.isReady || !content}
          onClick={() => changeContent(content as string)}
        >
          RESET
        </button>
        <button disabled={!gameState.isReady || !content} onClick={goToEnd}>
          Go To end
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "aliceblue",
          flex: 1,
          margin: "1em",
          padding: "1em",
        }}
      >
        <Map />
      </div>
    </div>
  );
};

export default Game;
