import React,{useState,useEffect} from 'react';
import '../App.css';
import Slider from "react-slick";

export default function PopularBook(props) {  
    const books = props.popularBooks;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (books.length > 0) {
            setLoading(false);
        }
    }, [books]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, 
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 3000, 
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className='bookContainerpopular'>
            <h2>Popular Books</h2>
            {loading ? (
                <div className="loadingContainer">
                    <div className="spinner"></div> 
                </div>
            ) : (
                <Slider {...settings}>
                    {books.map(book => {
                        const imageUrl = book.cover_i
                            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                            : 'https://via.placeholder.com/150';

                        return (
                            <div key={book.key} className="bookSlide">
                                <img src={imageUrl} alt={book.title} className="bookThumbnail" />
                                <div className="bookDetails">
                                    <h3 className="bookTitle">{book.title}</h3>
                                    <p className="bookAuthors">Author:&nbsp;&nbsp;{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                                    <p>Published In:&nbsp;&nbsp;{book.first_publish_year}</p>
                                    <button>
                                        <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">
                                            Preview
                                        </a>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            )}
        </div>
    );
}
