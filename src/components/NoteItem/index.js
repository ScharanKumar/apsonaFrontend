import { Component } from "react";
import "./index.css"
import {v4 as uuidv4} from 'uuid'
import Cookies from "js-cookie"
import LabelItem from "../LabelItem";
import { withRouter } from "react-router-dom";

class NoteItem extends Component{
    state={label:'',label_list:[],list:[],there:false,noLabels:0,bgColor:""}
    a=(event)=>{
        this.setState({label:event.target.value})
    }

    componentDidMount(){
        this.labels()
    }

    del=async()=>{
        const {details}=this.props
        const { title,archieved,description,id}=details
        const id1=uuidv4()
        const jwtToken=Cookies.get("jwt_token")
        const username=Cookies.get("name")
        const {label_list}=this.state
        console.log("LABEL_LIST")
        console.log(label_list)
        
        const option1={
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }

        const response1=await fetch(`https://apsonabackend-bvlz.onrender.com/delete/note/${id}`,option1)
        console.log(response1)
        // const data2=await response1.json()
        // console.log(data2)
        // id, title, description, person_username, archieved, date_of_delete
        
        let date = new Date();
let year=date.getFullYear()
let month=date.getMonth()+1
let day=date.getDate()
let x="".concat(year)
let y = "-".concat(month)
let z ="-".concat(day)
let l="".concat(x,y,z)
console.log(l)
        const data={
            "id":`${id1}`,
            "person_username":`${username}`,
            title,
            description,
            archieved,
            "date_of_delete":`${l}`
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
        const response=await fetch("https://apsonabackend-bvlz.onrender.com/post/deleted_note",option)
        console.log(response)
        // const data1=await response.json()
        // console.log(data1)
        // this.setState({list:data, there:true, noLabels:data.length})

        const option2={
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response2=await fetch(`https://apsonabackend-bvlz.onrender.com/get/label/${id}`,option2)
        console.log(response)
        const data3=await response2.json()
        console.log(data3)
        this.setState({list:data3, there:true, noLabels:data.length})

        const {history}=this.props
        history.replace("/bin")
    }

    delete1=async(id_label)=>{
        const jwtToken=Cookies.get("jwt_token")
        const {label_list}=this.state
        console.log("LABEL_LIST")
        console.log(label_list)
        const {details}=this.props
        const { id}=details
        const option1={
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }

        const response1=await fetch(`https://apsonabackend-bvlz.onrender.com/delete/label/${id_label}`,option1)
        console.log(response1)
        // const data2=await response1.json()
        // console.log(data2)

        const option={
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response=await fetch(`https://apsonabackend-bvlz.onrender.com/get/label/${id}`,option)
        console.log(response)
        const data=await response.json()
        console.log(data)
        this.setState({list:data, there:true, noLabels:data.length})

    }
    
    labels=async()=>{
        const {details}=this.props
        const { id}=details
        const jwtToken=Cookies.get("jwt_token")
        const option1={
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response1=await fetch(`https://apsonabackend-bvlz.onrender.com/get/label/${id}`,option1)
        console.log(response1)
        const data2=await response1.json()
        console.log("LabelList")
        console.log(data2)
        this.setState({list:data2, there:true, noLabels:data2.length})
    }

    addLabel=async()=>{
       
       const id_label=uuidv4()
       const {label}=this.state
       const {details}=this.props
        const { id}=details
       const username=Cookies.get("name")
        const jwtToken=Cookies.get("jwt_token")
        const data={
            id_label,
            "person_name":`${username}`,
            "id_note":`${id}`,
            "label_name":`${label}`
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
        const response=await fetch("https://apsonabackend-bvlz.onrender.com/post/label",option)
        console.log(response)
        // const data1=await response.json()
        // console.log(data1)
        // const x = [...label_list, label]
        // this.setState({label_list:x, label:""})
        this.setState(prevState => ({
            label_list: [...prevState.label_list, label ]
          }))
         this.setState({label:""})
         
        const option1={
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:`bearer ${jwtToken}`
              },
        }
        const response1=await fetch(`https://apsonabackend-bvlz.onrender.com/get/label/${id}`,option1)
        console.log(response1)
        const data2=await response1.json()
        console.log(data2)
        this.setState({list:data2, there:true, noLabels:data2.length})


        
        
    }
    addOrNot=()=>{
        const {noLabels}=this.state
        if (noLabels<=8){
            return(
                <button className="noteItemBut1" type="button" onClick={this.addLabel}>Add label</button>
            )
        }
        else{
            return(
                <button  className="noteItemBut1" type="button">Can't add more label</button>
            )
        }
    }
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
        history.replace("/archieve")
    }
    boxClick=()=>{
        this.setState({bgColor:"rgb(224, 196, 196)"})
    }
    boxClick1=()=>{
        this.setState({bgColor:"rgb(225, 225, 166)"})
    }
    boxClick2=()=>{
        this.setState({bgColor:"rgb(227, 214, 216)"})
    }
    boxClick3=()=>{
        this.setState({bgColor:"white"})
    }
    show=()=>{
        const {label, there, list}=this.state
        const {details}=this.props
        const { title, description,archieved}=details
        if (archieved==="false" || archieved===false || archieved===0){
            return(
                <div className="noteItemCon1" style={{backgroundColor: this.state.bgColor}}
                >
                    <div className="noteItemCon2">
                    <h1 className="headNoteItem">{title}</h1>
                    <p className="paraNoteItem">{description}</p>
                    <button className="noteItemBut" type="button" onClick={this.del}>Delete Note</button>
                    <button className="noteItemBut" type="button" onClick={this.arch}>Archieve Note</button>
                    <div className="noteItemCon5">
            <p>Background Color</p>
            <div className="noteItemCon5">
            <div className="l" onClick={this.boxClick3}>
                {/* <p>hi</p> */}
            </div>
            <div className="x" onClick={this.boxClick}>
                {/* <p>hi</p> */}
            </div>
            <div className="y" onClick={this.boxClick1}>
                {/* <p>hi</p> */}
            </div>
            <div className="z" onClick={this.boxClick2}>
                {/* <p>hi</p> */}
            </div>
            </div>
          </div>
                    </div>
                    <div className="noteItemCon3">
                    <div className='x14'>
            <label className='labelAJ1' htmlFor='label'>Label</label>
            <input onChange={this.a} className='inputAJ1' id='label' value={label} type='text' placeholder='Enter the label' />
          </div>
          {this.addOrNot()}
          
          {there &&     <ul className="successCon11">
                {list.map(every=>
                    (<LabelItem delete1={this.delete1} details={every} key={every.id}/>)
                )}
            </ul>
        }
                    </div>
                  
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

export default withRouter(NoteItem)