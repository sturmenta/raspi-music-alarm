import React from "react";
import { Howl } from "howler";

import "./App.css";

function App() {
  const handleSongFiles = async (event: any) => {
    if (event.target.files.length !== 0) {
      const files = event.target.files;
      const songsPath: string[] = [];

      for (let x = 0; x < files.length; x++) {
        await new Promise((res: any) => {
          const fl = new FileReader();
          fl.addEventListener("load", (loadEvent: any) => {
            songsPath.push(loadEvent.target.result);
            res();
          });
          fl.readAsDataURL(files[x]);
        });
      }

      const autoplay = (i: number, list: any) => {
        const sound = new Howl({
          src: [list[i]],
          preload: true,
          onend: () => autoplay(i + 1 === list.length ? 0 : i + 1, list),
        });
        sound.play();
      };
      autoplay(0, songsPath);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="file"
          onChange={handleSongFiles}
          accept=".mp3, .wav, .flac"
          multiple
        />
      </header>
    </div>
  );
}

export default App;
