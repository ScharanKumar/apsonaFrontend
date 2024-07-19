import "./index.css"
const LabelItem=(props)=>{
    const {details, delete1}=props
    const {id_label,label_name}=details
    const y=()=>{
        delete1(id_label)
    }
    return(
        <div className="conLabelItem1">
            <p>{label_name}</p>
            <button className="labelItemBut" type="button" onClick={y}>Delete</button>
        </div>
    )
}

export default LabelItem