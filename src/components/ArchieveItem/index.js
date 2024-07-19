import { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie"
import "./index.css"

class ArchieveItem extends Component{
    
    arch=async()=>{
        const jwtToken=Cookies.get("jwt_token")
        const {details}=this.props
        const { id, archieved}=details
        let bool;
        if (archieved==="true" || archieved===true || archieved===1){
            bool= "false"
        }
        else{
           bool="true"
        }
        const option1={
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response1=await fetch(`https://apsonabackend-bvlz.onrender.com/archieve/note/${id}/${bool}`,option1)
        console.log(response1)
        const {history}=this.props
        history.replace("/")
        
    }

    show=()=>{
        const {details}=this.props
        const { title, description,archieved}=details
        if (archieved==="true" || archieved===true || archieved===1){
            return(
                <div className="archorbinCon">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <button type="button" onClick={this.arch}>Restore</button>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
        
    }

    

    render(){
        
        return(
           <div>
                {this.show()}
                
           </div>
        )
    }
}

export default withRouter(ArchieveItem)