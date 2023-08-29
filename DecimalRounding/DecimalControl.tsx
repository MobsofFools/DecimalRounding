import React, { useEffect } from "react";
import { css } from "@emotion/css";
import { ChangeEvent, FocusEvent, useState } from "react";
import { IInputs } from "./generated/ManifestTypes";

export type IDecimalControlProps = {
    onChange:(numberData: number|undefined) => void;
    context?:ComponentFramework.Context<IInputs>;
}

const DecimalControl = (props:IDecimalControlProps) => {
    const {onChange, context} = props;
    const controlInitialValue = context?.parameters.boundField.raw!
    const [controlValue, setControlValue] = useState<number|string|undefined>(controlInitialValue? controlInitialValue: "");
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
    }
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if(typeof controlValue === 'string' && length > 0)
        {
            const result = numberRounding(Number.parseFloat(controlValue),roundDirection)
            if(Number.isNaN(result)){
                setControlValue("");
                onChange(undefined)
                return;
            }
            setControlValue(result);
            onChange(result)
        }
        else{
            setControlValue("");
            onChange(undefined)
        }
    }
    // useEffect(()=>{
    //     if(controlValue !== undefined){
    //         if(typeof controlValue === 'number'){
    //             if(Number.isNaN(controlValue)){
    //                 onChange(undefined)
    //             }
    //             else{
    //                 onChange(controlValue);
    //             }
    //         }
    //         else if( typeof controlValue === 'string')
    //         {
    //             onChange(Number.parseFloat(controlValue));
    //         }
    //         else{
    //             onChange(undefined)
    //         }
    //     }
    //     else{
    //         onChange(undefined)
    //     }
        
    // },[controlValue])
    function handleClearEvent(){
        setControlValue("");
        onChange(undefined);
    }
    function registerClearEventListener(){
        window.top?.addEventListener(`clear${props.context?.parameters.boundField.attributes?.LogicalName}`,handleClearEvent)
    }
    useEffect(()=>{
        registerClearEventListener();
    },[])
    return(
        <div className="pa-bc flexbox" style={{display:"flex"}}>
            <input className={css`padding:4px;border:none; width:100%; &:hover:{border:1px solid black }; box-sizing:border-box;`} aria-label={context?.parameters.boundField.attributes?.DisplayName} value={controlValue} onChange={handleChange} onBlur={handleBlur} tabIndex={0} placeholder="---"></input>
        </div>
    )
}
export default DecimalControl