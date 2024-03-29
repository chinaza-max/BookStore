import React,{Fragment,useState} from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../style/uploadBody.css"







const UploadBody=(props)=>{
    const [file,setFile]=useState('');
    const [filename,setFilename]=useState('Choose file');
    const [uploadedFile,setUploadedFile]=useState({});
    const [eventInfo,setEventInfo]=useState({courseCode:''});

    const{courseCode}=eventInfo


    const onChange=(e)=>{
        if(e.target.files[0].name){
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name)
        }
    }
    
    const handleChange=(event)=>{
        const {name,value}=event.target
        setEventInfo({...eventInfo,[name]:value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('file',file);
        formData.append('courseCode',courseCode);

        try{
            const res=await axios.post('/uploadPDF/'+props.id,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            const{fileName,filePath,errMessage}=res.data
            setUploadedFile({fileName,filePath,errMessage})
        }
        catch(err){
            if(err){
                console.log(err)
            }
            else{
                console.log(err.response.data.msg)
            }
        }
    }
    return(
        <Fragment>
            <div className="container">
    
                <form onSubmit={onSubmit}  encType="multipart/form-data">
                    <div className="custom-file mt-4">
                        <input type="file" name="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" onChange={onChange} required/>
                        <label className="custom-file-label" htmlFor="inputGroupFile03">{filename}</label>
                    </div>
                    {uploadedFile.errMessage ? <h6 className='error'>{uploadedFile.errMessage}</h6>:null}
                    <div className="Author"> 
                    
                        <label>course code :</label>
                        <input type="text" name="courseCode" onChange={handleChange} required/>
                    </div>
                    <input type="submit" value="Upload"  className="btn btn-primary btn-block  mt-4"/>
                </form>
                {
                uploadedFile.fileName   ? 
                    <div className="row mt-5 uploadedImg" >
                        <div className="col-md-6 m-auto"  > 
                        
                        <iframe className="pdfImg" height={200} width={150}  src={uploadedFile.filePath} title={uploadedFile.filePath} style={{overflow:'hidden'}}>

                        </iframe>
                     </div>
                   </div> : null
                }
       
            </div>
        </Fragment>
    )
}

export default UploadBody;