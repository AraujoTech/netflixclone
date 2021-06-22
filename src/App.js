import React,{useEffect,useState} from 'react';
import TMDB_Request from './TMDB_Request';
import MovieRow from './Components/MovieRow';
import FeaturedMovie from './Components/FeaturedMovie';
import Header from './Components/Header';
import './App.css'


export default() => {

  const [movieList,setMovieList] = useState([]);
  const [featuredData,setFeaturedData]=useState(null);
  const [blackHeader,setBlackHeader] = useState(false);
  
  useEffect(()=>{
    const loadAll = async() =>{

//pegando a lista total
      
    let list = await TMDB_Request.getHomeList();
      setMovieList(list);

       //Pegando o Featured
  let originals = list.filter(i=>i.slug === 'originals');
  let randomChosen = Math.floor(Math.random()* (originals[0].items.results.length - 1));
  let chosen = originals[0].items.results[randomChosen];
  let chosenInfo = await TMDB_Request.getMovieInfo(chosen.id,'tv');
  setFeaturedData(chosenInfo);

    }
    loadAll();
  },[] );

 useEffect(()=>{
  const scrollListener = ()=>{
    if(window.scrollY>100){
      setBlackHeader(true);
    } else{
      setBlackHeader(false);
    }
  }

  window.addEventListener('scroll',scrollListener);

  return ()=>{
    window.removeEventListener('scroll',scrollListener);
  }


 },[]);

  return(
   <div className='page'>
     <Header black = {blackHeader}/>

     {featuredData &&
        <FeaturedMovie item={featuredData}/>
     }

     
     <section className='lists'>
       {movieList.map((item,key)=>(
         <div>
           <MovieRow key={key} title={item.title} items={item.items} />
           
         </div>


       ))}
     </section>

     <footer>
       Feito por Rafael de Mendonça Araújo
     </footer>

     {movieList.length <=0 &&
        <div className='loading'>
          <img src = 'https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif' alt='Carregando'></img>

        </div>
     }
   </div>
  )
}