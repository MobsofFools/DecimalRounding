import React from "react";
import { css } from "@emotion/css";
import { ChangeEvent, FocusEvent, useState } from "react";
import { IInputs } from "./generated/ManifestTypes";

export type IDecimalControlProps = {
    onChange:(numberData: number|undefined) => void;
    context?:ComponentFramework.Context<IInputs>;
}

const DecimalControl = (props:IDecimalControlProps) => {
    const {onChange, context} = props;
    const [controlValue, setControlValue] = useState<number|string|undefined>(context?.parameters.boundField.raw!);
    const roundDirection = context?.parameters.roundDirection.raw!;
    function numberRounding (number:number,direction?:string) {
        if(typeof number === 'number')
        {
            if(direction === "up"){
                return Math.ceil(number)
            }
            else{
                return Math.floor(number)
            }
        }
        else{
            return undefined;
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setControlValue(e.currentTarget.value);
        console.log(e.currentTarget.value)
    }
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if(typeof controlValue === 'string')
        {
            const result = numberRounding(Number.parseFloat(controlValue),roundDirection)
            setControlValue(result);
            onChange(result)
        }
    }
    return(
        <div className="pa-bc flexbox" style={{display:"flex"}}>
            <input className={css`padding:4px;border:none; width:100%; &:hover:{border:1px solid black }; box-sizing:border-box;`} value={controlValue} onChange={handleChange} onBlur={handleBlur} tabIndex={0} placeholder="---"></input>
        </div>
    )
}
export default DecimalControl