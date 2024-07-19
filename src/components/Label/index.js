import { Component } from "react";
import "./index.css"

class Label extends Component{

    x=()=>{
        const {details, fun}=this.props
        const {label_name}=details
        fun(label_name)
    }

    render(){
        const {details}=this.props
        const {label_name}=details
        return(
            <div className="labelCont">
                
                <button className="paraLabel" onClick={this.x}>LABEL : {label_name}</button>
            </div>
        )
    }
}

export default Label