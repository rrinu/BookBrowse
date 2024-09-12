import React from 'react';
import '../App.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Book(props) {
    const books = props.allBooks;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, 
        slidesToScroll: 5,
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
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots:false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots:false,
                }
            }
        ]
    };

    return (
        <div className='bookContainerall'>
            {books.length > 0 && <h2>Search Results for {props.s}</h2>}
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
        </div>
    );
}
