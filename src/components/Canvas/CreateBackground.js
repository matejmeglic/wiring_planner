import React from "react";
import { Rect } from "react-konva";


export default function CreateBackground(props) {




    return (
        <div>
            <Rect
                x="0"
                y="0"
                width={props.width}
                height={props.height}
                fill="#ffffff"
                key={"background_rectangle"}
            />
        </div>
    )


}

