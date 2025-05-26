import React, { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core";
import "./TableWorkCss.css";

const TableWork = () => {

    const [res, setRes] = useState<String>();
    const [table, setTable] = useState<Array<Record<string,string>>>([]);
    const [count,setCount] = useState<number>(0);

    const [loaded, setLoaded] = useState<boolean>(false)

    interface Format {
        success: boolean,
        message: string,
        data: Array<Record<string,string>>
    }



    const query1: string = `
    SELECT one."*SAP_nomer", one.ENTRY, one."Description" 
    FROM E3_ADMIN."ComponentData" one
    JOIN E3_ADMIN."ComponentAttribute" two ON two.ID = one.ID
    WHERE two."AttributeValue" = 'Разрешено использование' AND ROWNUM <= 3
  `;

    const query3: string = `
  SELECT one."*SAP_nomer", one.ENTRY, one."Description"
  FROM E3_ADMIN."ComponentData" one
  JOIN E3_ADMIN."ComponentAttribute" two ON two.ID = one.ID
  WHERE two."AttributeValue" = 'Разрешено использование'
`;

    const query2: string = `
    SELECT COUNT(*) FROM E3_ADMIN."SymbolData"
    `;

    
    useEffect(() => { start_table();}, []); 
    const start_table = async () => {
        const response: string = await invoke("get_json_db_response", { query: query3 });
        //setRes(response);

        const table0: Format = JSON.parse(response);
        setTable(table0.data);
        setCount(table0.data.length);
        setLoaded(!loaded)
      };



    return(
        <div>
            {/*<div>res: </div>
            <pre>{res}</pre>*/}
            {/*<button onClick = {start_table}>click</button>*/}
            <div>
                Кол-во строк: {count - 1}
            </div>



            <div className="grid-item200">

                {loaded && (
                        
                    <table className="tab00">
                        <thead>
                        <tr>
                            {Object.keys(table[0]).map((key) => (
                            <th key={key}>{key}</th>
                            ))}
                        </tr>
                        </thead>


                        <tbody>
                        {table.map((item, index) => (
                            <tr key={index}>
                            {Object.values(item).map((value, valueIndex) => (
                                <td key={valueIndex}>{value}</td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>

                )}

            </div>
            
        </div>
    )
}

export default TableWork;