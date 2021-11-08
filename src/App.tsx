import React, { useState } from "react";
import { Howl } from "howler";
import TimePicker from "react-time-picker";
import { css } from "@emotion/css";

import "./App.css";

function App() {
  const [time, setTime] = useState("04:20");

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
        <div className="item">
          <div
            className={css`
              .react-time-picker {
                .react-time-picker__wrapper {
                  .react-time-picker__inputGroup {
                    input,
                    select {
                      color: white;
                    }
                  }
                }
              }
            `}
          >
            <TimePicker
              onChange={setTime}
              value={time}
              clearIcon={null}
              clockIcon={null}
            />
          </div>
        </div>
        <div className="item">
          <input
            type="file"
            onChange={handleSongFiles}
            accept=".mp3, .wav, .flac"
            multiple
          />
        </div>
      </header>
    </div>
  );
}

export default App;
