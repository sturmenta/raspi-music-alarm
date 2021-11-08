import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import TimePicker from "react-time-picker";
import { css } from "@emotion/css";
import dayjs from "dayjs";

import "./App.css";

function App() {
  const [time, setTime] = useState("04:20");
  const [songsPath, setSongsPath] = useState<string[]>([]);

  const timer = useRef<any>(null);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(timer.current);
    };
  }, []);

  const handleSongFiles = async (event: any) => {
    if (event.target.files.length !== 0) {
      const files = event.target.files;
      const _songsPath: string[] = [];

      for (let x = 0; x < files.length; x++) {
        await new Promise((res: any) => {
          const fl = new FileReader();
          fl.addEventListener("load", (loadEvent: any) => {
            _songsPath.push(loadEvent.target.result);
            res();
          });
          fl.readAsDataURL(files[x]);
        });
      }

      setSongsPath(_songsPath);
    }
  };

  const playSongs = () => {
    const autoplay = (i: number, list: any) => {
      const sound = new Howl({
        src: [list[i]],
        preload: true,
        onend: () => autoplay(i + 1 === list.length ? 0 : i + 1, list),
      });
      sound.play();
    };

    autoplay(0, songsPath);
  };

  const startAlarm = () => {
    if (songsPath.length) {
      const startDate = dayjs();
      let endDate = dayjs().hour(parseInt(time.split(":")[0]));
      endDate = endDate.minute(parseInt(time.split(":")[1]));

      const pre_diff = endDate.diff(startDate, "seconds");
      if (pre_diff < 0) endDate = endDate.add(1, "day"); // if time set before actual 24hs time -> add 1 day

      const final_diff = endDate.diff(startDate, "seconds");

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        playSongs();
      }, final_diff * 1000);

      alert(
        "your audio files are going to be played at " +
          endDate.format("DD/MM/YYYY - HH:mm")
      );
    } else {
      alert("no sound files are selected!");
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
              onChange={(value: any) => {
                setTime(value);
                console.log("time setted ->", value);
              }}
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
        <button onClick={startAlarm}>set alarm</button>
      </header>
    </div>
  );
}

export default App;
