import { Button, Modal } from 'flowbite-react'
import React from 'react'
import { selectedMovieAtom, showMovieDetailAtom } from '../../state/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import Image from 'next/image'
import { processGenres, processRating } from '../../utils'

const base_url = "https://image.tmdb.org/t/p/original"

export default function MovieDetail() {
    const [showDetail, setShowDetail] = useRecoilState(showMovieDetailAtom)
    const selectedMovie = useRecoilValue(selectedMovieAtom)
    const onClose = () => {
        setShowDetail(false)
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
                <div className="img h-96 w-72 rounded-tl-3xl rounded-br-3xl border border-netflix-black shadow-sm shadow-netflix-black ml-12 bg-contain bg-center" style={{backgroundImage: `url(${base_url}${selectedMovie.poster_path})`}}>
                </div>
                <div className='movie_desc mx-24 mt-8'>
                    <div className='flex mb-4'>
                        {processGenres(selectedMovie.genre_ids)}
                    </div>
                    <h1 className='text-5xl drop-shadow-6xl shadow-netflix-black text-left mb-4'>{selectedMovie.title}</h1>
                    <div className='flex mb-4'>
                        {processRating(selectedMovie.vote_average, selectedMovie.vote_count)}
                    </div>
                    <p className='text-gray-300 text-left text-sm'>{selectedMovie.overview}</p>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    )
}
