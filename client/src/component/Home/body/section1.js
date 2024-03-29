import '../../../style/section1.css';
// import Carousel from "react-elastic-carousel";
import Item from "./item2";
import "../../../style/styles2.css";
import { Link } from "react-router-dom";
import MyCarousel from '../../Carousel';


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 340, itemsToShow: 2 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },

];
function Section1(props){
    
    function changeView(value){
        props.updateNavNameP(value)
    }
    function isLogedIn(){
        console.log( window.localStorage.getItem('isAuthenticated'))
        if(window.localStorage.getItem('isAuthenticated')==="true"){
             return
        }
        else{
            props.history.push("/login")
        }
 
     }
    return(
      <div> 
        <h5 className="categories-title" style={{zIndex:900000}}>categories</h5>
          <div  className='section1'>
              <MyCarousel breakPoints={breakPoints} autoPlaySpeed={5000} >
                  <Item style={{height:160,width:250,}}>
                    <div id="section1Book"  className="divCategory"><h3 className="h3Categories" onClick={()=>changeView("Filler")}>Books</h3>  </div>
                  </Item>
                  <Item style={{height:160,width:250,}}>
                      <div id="section1Filler"  className="divCategory"><h4 className="h3Categories" onClick={()=>changeView("Book")}>School Filler</h4>  </div>
                  </Item>
                  <Item style={{height:160,width:250,}} >
                      <div id="section1Accomodation"  className="divCategory">
                            <h4 className="h3Categories"> 
                                <Link  className=" h3Categories__link"  to={`/home/${props.id}/Accomodation/`} onClick={()=>isLogedIn()}>
                                        Accomodation
                                </Link> 
                            </h4>
                      </div>
                  </Item>
                  <Item style={{height:160,width:250,}} >
                      <div id="section1Project"  className="divCategory"><h4 className="h3Categories"> <a href="https://api.whatsapp.com/send?phone=08184724615&text=you%20welcome!">Project Helper</a> </h4>  </div>
                  </Item>
                  <Item style={{height:160,width:250,}}>
                      <div id="section1Term"  className="divCategory"><h4 className="h3Categories"><a href="https://api.whatsapp.com/send?phone=08184724615&text=you%20welcome!">Term Paper Writer</a></h4>  </div>
                  </Item>
                  <Item style={{height:160,width:250,}}>
                      <div id="section1Advert"  className="divCategory"><h4 className="h3Categories"><a href="https://api.whatsapp.com/send?phone=08184724615&text=you%20welcome!">Advert Placement</a> </h4>  </div>

                  </Item>
              </MyCarousel>
          </div>
      </div>
    )
}
//autoPlaySpeed={5000} enableAutoPlay={true}
export default Section1