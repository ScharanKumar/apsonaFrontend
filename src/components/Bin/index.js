import { Component } from "react";
import Cookies from "js-cookie"
import Header from "../Header";
import Leftheader from "../Leftheader"
import BinItem from "../BinItem"
import Label from "../Label";
import NoteItem from "../NoteItem";
import "./index.css"
// import {v4 as uuidv4} from "uuid"


class Bin extends Component {
    state={loadingView:true,label_list:[],display_list:[], there1:false, archieved:false, successView:false,list:[], title:"", description:""}
    
    componentDidMount(){
        this.after()
    }

    fun=async(label_name)=>{
        const username=Cookies.get("name")
        const jwtToken=Cookies.get("jwt_token")
        console.log("FIRST")
        const option1={
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response1=await fetch(`https://apsonabackend-bvlz.onrender.com/get/detailLabel/${username}/${label_name}`,option1)
        console.log(response1)
        const data2=await response1.json()
        console.log(data2)
        this.setState({ display_list:data2})
    }

   

    after=async()=>{
        const jwtToken=Cookies.get("jwt_token")
        const username=Cookies.get("name")
        //const {search}=this.state
        console.log(username, jwtToken)
        const option={
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response=await fetch(`https://apsonabackend-bvlz.onrender.com/get/deleted_notes/${username}`,option)
        console.log(response)
        const data=await response.json()
        console.log(data)
        this.setState({list:data,successView:true, loadingView:false})

        const option11={
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response1=await fetch(`https://apsonabackend-bvlz.onrender.com/get/distinct/${username}`,option11)
        let data11=await response1.json()
        let x = Array.from(new Set(data11))
        console.log("How re")
        console.log(x);

         this.setState({label_list:x, there1:true})
        
    }
    loading=()=>{
        return(
            <div>
                <h1>Loading.....</h1>
            </div>
        )
    }
    success=()=>{
        const {list}=this.state
        return(
            <ul className="successCon1">
                {list.map(every=>
                    (<BinItem details={every} key={every.id}/>)
                )}
            </ul>
        )
    }
    labelView=()=>{
        const {display_list}=this.state
        console.log(display_list)
        return(
            <ul className="homeContainer3">
                {display_list.map(every=>
                    (<NoteItem  details={every} key={every.id}/>)
                )}
            </ul>
        )
    }
    render() {
        const {loadingView, successView, there1, label_list}=this.state
        return (
            <div className="homeContainer1">
                <Header home='true' jobs="false" />
                <div className="homeContainer2">
                    <div className="conArchieve11">
                    <Leftheader notes="false" archieve="false" bin="true"  />
                    {there1 && <ul className="contain">
                        {label_list.map(every=>(
                            <Label fun={this.fun} details={every} />
                        ))}
                        </ul>}
                        </div>
                    <div>
                        
                    {loadingView && this.loading()}
                    {successView && this.success()}
                    {this.labelView()}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Bin