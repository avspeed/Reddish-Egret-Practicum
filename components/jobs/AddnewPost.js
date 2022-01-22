import { TextField } from "@material-ui/core";


const Addnewpost = ()=>{
 return(
  <div ClassName = "App">
    <TextField variant = "outlined"
    placeholder ="what is on your mind"
    multiline
    row={5}
    rowsMax={10} />
    </div>
  
 )
}
export default Addnewpost;