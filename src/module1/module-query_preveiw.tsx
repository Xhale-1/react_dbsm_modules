import { useState, useEffect } from "react";
import { listen, UnlistenFn } from '@tauri-apps/api/event';

const Query_preview = () => {
    const [dev, setdev] = useState<string | null>("1");
    const [sym, setsym] = useState<string | null>("2");

    interface Format{
        success: string;
        message: string;
        data: Array<Record<string, string>>;
    }



    const listen_backend = <T,>(
        eventName: string,
        callback: (payload: T) => void,
        dependencies: any[] = []
      ) => {
        useEffect(() => {
          let unlisten: UnlistenFn | undefined;
    
          listen<T>(eventName, (event) => {
            callback(event.payload);
          }).then((unlistenFn) => {
            unlisten = unlistenFn;
          });
          return () => {
            unlisten?.();
          };
        }, dependencies);
      };
    
    listen_backend<string>('dev', (payload) => {
        const json: Format = JSON.parse(payload);
        const firstElement = json.data[0];
        const value = Object.values(firstElement)[0];
        setdev(value);
      });
    listen_backend<string>('sym', (payload) => {
        const json: Format = JSON.parse(payload);
        const firstElement = json.data[0];
        const value = Object.values(firstElement)[0];
        setsym(value);
      });


    return (
        <div>
            <p>dev: {dev}</p>
            <p>sym: {sym}</p>
        </div>
    )

};

export default Query_preview;