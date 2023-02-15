import Img from "../Imgs/map.png"

export default function PicLoader({longitude,latitude,filename}) {

    return ( 
        // <div style={{padding:"10px", backgroundImage: "url(/images/bgimage.jpg)",height:"600px"}}>
        //     <center>
        //     <h1 style={{fontSize:"50px",fontFamily:"fantasy"}}>Picture</h1>
        //     <img style={{  width:"30%" , height:"auto", borderRadius:"20px"}} src={filename}/>
        //     </center>
        // </div>
        <div style={{height:'100%'}}>
        <img src={Img}/>
        </div>
    );
}