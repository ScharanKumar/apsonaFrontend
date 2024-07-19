import { Component } from "react";
import Cookies from "js-cookie"
import Header from "../Header";
import Leftheader from "../Leftheader"
import ArchieveItem from "../ArchieveItem"
import NoteItem from "../NoteItem";
import "./index.css"
import {v4 as uuidv4} from "uuid"
import Label from "../Label";

class Archieve extends Component {
    state={display:true,loadingView:true, archieved:false, successView:false,search:"",list:[], title:"", description:"",  label_list:[], there1:false, display_list:[]}
    a=(event)=>{
        this.setState({title:event.target.value})
    }
    b=(event)=>{
        this.setState({description:event.target.value})
    }
    c=(event)=>{
        this.after(event.target.value)
    }
    componentDidMount(){
        this.after("")
    }

    add=async()=>{
        const {title, description,archieved}=this.state
        const id =uuidv4()
        console.log("Add")
        const username=Cookies.get("name")
        const jwtToken=Cookies.get("jwt_token")
        const data={
            id,
            "person_username":`${username}`,
            title,
            description,
             archieved
        }
        const option={
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
              body: JSON.stringify(data)

        }
        const response=await fetch("https://apsonabackend-bvlz.onrender.com/post/note",option)
        console.log(response)
        const data1=await response.json()
        console.log(data1)

        
        const {search}=this.state
        
        const option1={
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response1=await fetch(`https://apsonabackend-bvlz.onrender.com/get/notes/${username}/${search}`,option1)
        console.log(response)
        const data2=await response1.json()
        console.log(data2)
        this.setState({list:data,successView:true, loadingView:false, title:'', description:''})

    }

    after=async(s)=>{
        const jwtToken=Cookies.get("jwt_token")
        const username=Cookies.get("name")
    
        console.log(username, jwtToken)
        if (s===""){
            console.log("SEARCH 0")
            const option={
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:`bearer ${jwtToken}`
                  },
            }
            const response=await fetch(`https://apsonabackend-bvlz.onrender.com/get/notes/all/${username}`,option)
            console.log(response)
            const data=await response.json()
            console.log(data)
            this.setState({list:data,successView:true, loadingView:false})
        }
        else{
            const option={
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:`bearer ${jwtToken}`
                  },
            }
            const response=await fetch(`https://apsonabackend-bvlz.onrender.com/get/notes/${username}/${s}`,option)
            console.log(response)
            const data=await response.json()
            console.log(data)
            this.setState({list:data,successView:true, loadingView:false})
        }
        this.setState({search:s})
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
                    (<ArchieveItem details={every} key={every.id}/>)
                )}
            </ul>
        )
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
        this.setState({display:false, display_list:data2})
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
        const {loadingView, successView, there1, label_list, search}=this.state
        return (
            <div className="homeContainer1">
                <Header home='true' jobs="false" />
                <div className="homeContainer2">
                    <div className="conArchieve11">
                    <Leftheader notes="false" archieve="true" bin="false"  />
                    {there1 && <ul className="contain">
                        {label_list.map(every=>(
                            <Label fun={this.fun} details={every} />
                        ))}
                        </ul>}
                        </div>
                    <div>
                        
                    <div className='x14'>
             <label className='labelAJ1' htmlFor='label'>Search</label>
             <input onChange={this.c} className='inputAJ1' id='label' value={search} type='text' placeholder='Enter what you want to search' />
           </div>
                    {loadingView && this.loading()}
                    {successView && this.success()}
                    {this.labelView()}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Archieve