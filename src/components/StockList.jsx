import {useState, useEffect, useRef} from "react";
import finnHub from "../api/finnHub.js";
import { BsCaretUpFill } from "react-icons/bs";
import { BsCaretDown } from "react-icons/bs";

const changeColor = (value) =>{
    if(value > 0){
        return "text-success"
    }else if(value < 0){
        return "text-danger"
    }else{
        return "text-dark"
    }
}
const addIcon = (value) =>{
    if(value > 0){
        return <BsCaretUpFill/>
    }else if(value < 0){
        return <BsCaretDown/>
    }else{
        return ""
    }
}

export default function StockList() {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
    const [stock, setStock] = useState([]);
    let isMounted = useRef(true);
    useEffect(() => {
        const fetchData = async () => {
            //const responses = [];
            try {

                const responses = await Promise.all(
                    watchList.map((symbol) => {
                        return finnHub.get("/quote", {
                            params: {
                                symbol: symbol
                            }
                        });
                    })
                );
                const re = responses.map(res => {
                    return {
                        data: res.data,
                        symbol: res.config.params.symbol
                    }
                });
                console.log(re);
                setStock(re);

            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
        return () => {
            isMounted = false
        }


    }, [])

    return (
        <div>
            <table className="table hover mt-5">
                <thead>
                <tr>
                    <th scope="col">Symbol</th>
                    <th scope="col">Current Price</th>
                    <th scope="col">Price change</th>
                    <th scope="col">Percent change</th>
                    <th scope="col">High price of the day</th>
                    <th scope="col">Low price of the day</th>
                    <th scope="col">Open price of the day</th>
                    <th scope="col">Previous close price</th>
                </tr>
                </thead>
                <tbody>
                {stock.map((stock) => {
                    return (
                        <tr key={stock.symbol} className="table-row">
                            <th scope="row">{stock.symbol}</th>
                            <td>{stock.data.c}</td>
                            <td className={changeColor(stock.data.d)}>{stock.data.d} {addIcon(stock.data.d)}</td>
                            <td className={changeColor(stock.data.dp)}>{stock.data.dp} {addIcon(stock.data.dp)}</td>
                            <td>{stock.data.h}</td>
                            <td>{stock.data.l}</td>
                            <td>{stock.data.o}</td>
                            <td>{stock.data.pc}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
// hover: change the color of the row when the mouse is over it
// mt-5: margin top 5
