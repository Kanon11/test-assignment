import React from "react";
import List from "./List";
import { mainStyle as style } from "../Util/TSXstyles";
function Main(props: any) {
    return (
        <div style={style.body}>
        <List/>
        </div>
    )
}
export default Main;