import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

function App() {

  const [progress, setProgress] = useState(0)

  const [quotes,updateQuotes] = useState({text:"",author:""})

  const getQuotes = async() =>{
    setProgress(30)
    
    const data = await fetch("https://type.fit/api/quotes")
    const parsedData = await data.json()
    // console.log(parsedData);
    setProgress(60)
    let randomNUm = Math.floor(Math.random() * parsedData.length)
    // console.log(randomNUm); 
    setProgress(90)
    updateQuotes(parsedData[randomNUm])
    setProgress(100)
  }

  useEffect(()=>{
    getQuotes()
  },[])

  const copyQuote = () =>{
    navigator.clipboard.writeText(quotes.text) 
  }
  
  document.body.style.backgroundColor = "#5372EF"
  return (
    <>
    <LoadingBar
        color='#FFFF00'
        progress={progress}
        height={5}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="container bg-light mx-0 rounded-4 mx-auto border border-5 shadow shadow-lg py-3 px-4" style={{maxWidth:"600px",marginTop:"150px"}}>
            <h1 className="text-center my-3 fw-bold">Quote of the Day</h1>
            <h3 className='text-center mt-4 mb-2'>{quotes.text}</h3>
            <h5 className='text-end  pb-4'>- {quotes.author}</h5>
            <hr />
              <div className='d-flex justify-content-between'>
                <button type="button" class="btn text-light rounded-pill fs-3" onClick={copyQuote} style={{backgroundColor:"#5372EF"}}><i class="bi bi-clipboard2"></i></button>
                <button type="button" class="btn text-light rounded-pill fs-5" onClick={getQuotes} style={{backgroundColor:"#5372EF"}} >New Quote</button>
              </div>
      </div>

    </>
  );
}

export default App;
