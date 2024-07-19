import { withRouter } from "react-router-dom"
import "./index.css"
import {Link} from "react-router-dom"


const Leftheader=(props)=>{
    const {notes, archieve, bin }= props
    
    const a=()=>{
        if (notes==='true'){
            return(
                <p className="leftheaderpara1">Notes</p>
            )
        }
        else{
            return(
                <p className="leftheaderpara2">Notes</p>
            )
        }
    }

    const b=()=>{
        if (archieve==='true'){
            return(
                <p className="leftheaderpara1">Archieve</p>
            )
        }
        else{
            return(
                <p className="leftheaderpara2">Archieve</p>
            )
        }
    }

    const c=()=>{
        if (bin==='true'){
            return(
                <p className="leftheaderpara1">Bin</p>
            )
        }
        else{
            return(
                <p className="leftheaderpara2">Bin</p>
            )
        }
    }

    
    return(
        <div className="leftheaderCon1">
            
            <Link className="leftheaderLink" to="/" >
                {a()}
            </Link>
            <Link className="leftheaderLink" to="/archieve">
                {b()}
            </Link>
            <Link className="leftheaderLink" to="/bin">
                {c()}
            </Link>
            
        </div>
    )
}

export default withRouter(Leftheader)