import { Component } from "react";
import Cookies from "js-cookie"
import Header from "../Header";
import Leftheader from "../Leftheader"
import NoteItem from "../NoteItem"
import "./index.css"
import {v4 as uuidv4} from "uuid"
import Label from "../Label"

class Home extends Component {
    state={display:true,display_list:[],loadingView:true, archieved:false, successView:false,search:"",list:[], title:"", description:"", label_list:[], there1:false}
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
        // const data1=await response.json()
        // console.log(data1)

        
        const {search}=this.state
        
        if (search===""){
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
            this.setState({list:data,successView:true, loadingView:false, title:'',  description:''})
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
            const response=await fetch(`https://apsonabackend-bvlz.onrender.com/get/notes/${username}/${search}`,option)
            console.log(response)
            const data=await response.json()
            console.log(data)
            this.setState({list:data,successView:true, loadingView:false,title:'',  description:''})
        }

    }

    after=async(s)=>{
        console.log("after")
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
         this.setState({search:s})
        
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
    loading=()=>{
        return(
            <div>
                <h1>Loading.....</h1>
            </div>
        )
    }
    success=()=>{
        const {list}=this.state
        console.log(list)
        return(
            <ul className="successCon1">
                {list.map(every=>
                    (<NoteItem  details={every} key={every.id}/>)
                )}
            </ul>
        )
    }
    render() {
        const {loadingView, successView, title, description,search,display, label_list, there1}=this.state
        return (
            <div className="homeContainer1">
                <Header home='true'  />
                <div className="homeContainer2">
                    <div className="cont1">
                    <Leftheader   notes="true" archieve="false" bin="false"  />
                    {there1 && <ul className="contain">
                        {label_list.map(every=>(
                            <Label fun={this.fun} details={every} />
                        ))}
                        </ul>}
                        </div>
                     
                   {display && 
                     <div className="homeContainer3">
                     <div className='x14'>
             <label className='labelAJ1' htmlFor='label'>Search</label>
             <input onChange={this.c} className='inputAJ1' id='label' value={search} type='text' placeholder='Enter what you want to search' />
           </div>
                         <div className="homeCon15">
                         
 
                     <div className='x14'>
             <label className='labelAJ1' htmlFor='todo'>Title</label>
             <input onChange={this.a} className='inputAJ1' id='todo' value={title} type='text' placeholder='Enter the title' />
           </div>
 
           <div className='x14'>
             <label className='labelAJ1' htmlFor='todo'>Description</label>
             <input onChange={this.b} className='inputAJ1' id='todo' value={description} type='text' placeholder='Enter the description' />
           </div>
           <button className="noteItemBut" type="button" onClick={this.add}>Add Note</button>
                     </div>
                     {loadingView && this.loading()}
                     {successView && this.success()}
                     </div>
                   }

                   {this.labelView()}
                    
                </div>
                
            </div>
        )
    }
}

export default Home