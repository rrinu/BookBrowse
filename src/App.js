import React,{useState,useEffect} from 'react';
import './App.css';
import Book from './Components/Book';
import SearchBar from './Components/searchBar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopularBook from './Components/popular_books';
import BookOfTheWeek from './Components/BookOfTheWeek';
import Footer from './Components/Footer';


function App() {
  const [searchTerm,setSearchTerm]=useState('');
  const [books,setBooks]=useState([]);
  const [popular,setPopular]=useState([]);
  const [bookOfTheWeek, setBookOfTheWeek] = useState(null);

  async function getBookDetails(s){
    if(!s.trim()){
      return;
    }
    try
    {
    const response=await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(s)}`);
    if(response.ok){
      const responseJSON=await response.json();
      const filteredBooks = responseJSON.docs.slice(0,25);
      setBooks(filteredBooks);
    }
    else{
      throw new Error('Request Failed');
    }
  }
  catch(e){
    alert(`Network error: ${e.message}`);
  }
  }
  useEffect(() => {
    if (searchTerm) {
      getBookDetails(searchTerm);
    }
  }, [searchTerm]);

  async function getPopularBookDetails(){
    try{
      const response=await fetch('https://openlibrary.org/search.json?q=the');
      if(response.ok){
        const responseJSON=await response.json();
        const filteredBooks=responseJSON.docs.slice(0,25)
        const sortedBook=filteredBooks.sort((a,b)=>(b.edition_count || 0) - (a.edition_count || 0));
        setPopular(sortedBook);
      }
      else{
        throw new Error('Request Failed');
      }
    }
    catch(e){
      alert('Network Error');
    }
  }

  useEffect(() => {
    getPopularBookDetails();
}, []);

async function getBookOfTheWeek() {
  try {
    const response3 = await fetch('https://openlibrary.org/search.json?q=the');
    if (response3.ok) {
      const responseJSON3 = await response3.json();
      const bookw = responseJSON3.docs.slice(0, 100);
      const rand = Math.floor(Math.random() * bookw.length);
      const Botw = await bookw[rand];
      return Botw;
    } else {
      throw new Error('Request Failed');
    }
  } catch (e) {
    alert('Network Failed from bookofweek');
  }
}

useEffect(() => {
const fetchBookOfTheWeek = async () => {
  const lastUpdateDate = localStorage.getItem('lastUpdateDate');
  const currentDate = new Date();

  if (!lastUpdateDate || new Date(lastUpdateDate).getTime() + 7 * 24 * 60 * 60 * 1000 <= currentDate.getTime()) {
    const newBook = await getBookOfTheWeek();
    if (newBook) {
      setBookOfTheWeek(newBook);
      localStorage.setItem('bookOfTheWeek', JSON.stringify(newBook));
      localStorage.setItem('lastUpdateDate', currentDate.toISOString());
    }
  } else {
    const storedBook = JSON.parse(localStorage.getItem('bookOfTheWeek'));
    setBookOfTheWeek(storedBook);
  }
};
fetchBookOfTheWeek();
}, []);

  return (
    <div className="App">
      <div className='top'>
      <div className='header'>
      <h1>Book Browse</h1>
      <h3>Browse. Discover. Enjoy.</h3>
      </div>
      <SearchBar onSearch={setSearchTerm} bookResults={setBooks}/>
      </div>
      <Book allBooks={books} s={searchTerm} /> 
      <PopularBook popularBooks={popular}/>
      <BookOfTheWeek  bw={bookOfTheWeek} />
      <Footer />
       
</div>
  );
}

export default App;
