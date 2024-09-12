import React from 'react';
import '../App.css';

export default function BookOfTheWeek(props){
    const b=props.bw;
    if(!b){
        return null;
    }
    return(
        <div className='bookofweek'>
             <h2 className='h'>Book Of The Week</h2>
            <div className='bookofweekContainer'>
                <div className='img'>
                {b.cover_i && (
                <img className='weekimg' 
                    src={`https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`}
                    alt={b.title}
                />
            )}
            </div>
            <div className='bookDetails'>
            <h2>{b.title}</h2>
            <h4>by</h4>
            <h2>{b.author_name?.join(', ')}</h2>
            <p>{b.first_publish_year}</p>
            <button>
                                    <a href={`https://openlibrary.org${b.key}`} target="_blank" rel="noopener noreferrer">
                                        Read
                                    </a>
                                </button>
            </div>
            </div>
        </div>
    )
}
