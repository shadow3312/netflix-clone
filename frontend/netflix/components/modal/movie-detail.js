import { Modal } from 'flowbite-react'
import React from 'react'
import { selectedMovieAtom, showMovieDetailAtom } from '../../state/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import Image from 'next/image'
import { processGenres, processRating } from '../../utils'
import Button from '../button/button'

const base_url = "https://image.tmdb.org/t/p/original"


export default function MovieDetail() {
    const [showDetail, setShowDetail] = useRecoilState(showMovieDetailAtom)
    const selectedMovie = useRecoilValue(selectedMovieAtom)

    const onClose = () => {
        setShowDetail(false)
    }

    const iconStyle = {
        size: '1em'
    }

    return (
        console.log(selectedMovie),
        <Modal
            show={showDetail}
            onClose={onClose}
            size="7xl"
            popup={true}
        >
            <Modal.Header className='bg-black' />
            <Modal.Body className='h-[80vh] w-full' style={{padding: 0}}>
                <div className='movie_detail bg-cover h-full w-full' style={{backgroundImage: `url(${base_url}${selectedMovie.backdrop_path})`}}></div>
            <div class="bg-text flex mt-12">
                <div className="movie_img h-96 w-1/5 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md border-netflix-black shadow-lg shadow-netflix-black ml-12 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${base_url}${selectedMovie.poster_path})`}}>
                </div>
                <div className='movie_desc pl-12 mt-8 w-4/5'>
                    <div className='flex mb-4'>
                        {processGenres(selectedMovie.genre_ids)}
                    </div>
                    <h1 className='text-5xl drop-shadow-6xl shadow-netflix-black text-left mb-4'>{selectedMovie.title}</h1>
                    <div className='flex mb-4'>
                        {processRating(selectedMovie.vote_average, selectedMovie.vote_count)}
                    </div>
                    <p className='text-gray-300 text-left text-xs font-light'>{selectedMovie.overview}</p>
                    <div className='movie_buttons mt-4 flex'>
                    <Button text="watch" bgColor='transparent' iconName='play' iconStyle={iconStyle} />
                    <Button text="favorite" bgColor='#D81F26' iconName='favorite' iconStyle={iconStyle} />

                    </div>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    )
}
