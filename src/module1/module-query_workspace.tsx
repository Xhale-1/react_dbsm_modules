import { useState, useEffect } from "react"
import { listen, UnlistenFn } from '@tauri-apps/api/event';
import { invoke } from "@tauri-apps/api/core";


const Query_workspace = () => {

    const [devcount, setDevcount] = useState<string>()
    const [symcount, setSymcount] = useState<string>()

    interface Format{
      success: string;
      message: string;
      data: Array<Record<string, string>>;
  }






    useEffect(() => { startQuery();}, []); 

    const startQuery = async () => {
        const query1 = "SELECT COUNT(*) FROM E3_ADMIN.\"ComponentData\" ";
        const query2 = "SELECT COUNT(*) FROM E3_ADMIN.\"SymbolData\" ";
        const dev: string = await invoke("simple_query", { query: query1 });
        const sym: string = await invoke("simple_query", { query: query2 });
        setDevcount(dev);
        setSymcount(sym);
      };





    
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
    
    // listen_backend<string>('dev', (payload) => {
    //   const json: Format = JSON.parse(payload);
    //   const firstElement = json.data[0];
    //   const value = Object.values(firstElement)[0];
    //   setDevcount(value);
    //   });
    // listen_backend<string>('sym', (payload) => {
    //   const json: Format = JSON.parse(payload);
    //   const firstElement = json.data[0];
    //   const value = Object.values(firstElement)[0];
    //   setSymcount(value);
    //   });


    return (
    <div>
        <p> devcount: {devcount}</p>
        <p> symcount: {symcount}</p>
    </div>
    )

}

export default Query_workspace