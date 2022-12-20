import { Modal } from 'flowbite-react'
import React from 'react'
import { selectedMovieAtom, showMovieDetailAtom } from '../../state/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import Image from 'next/image'
import { processGenres, processRating } from '../../utils'
import Button from '../button/button'
import { IoIosClose } from 'react-icons/io'
import { IconContext } from 'react-icons'

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
        <Modal
            show={showDetail}
            onClose={onClose}
            size="7xl"
            popup={true}
        >
            <Modal.Body className='sm:h-[80vh] h-screen w-full overflow-y-scroll' style={{padding: 0}}>
                <div className='close absolute sm:right-10 right-4 top-5 pr-2 rounded bg-white w-4 h-4  text-white z-50 cursor-pointer' onClick={onClose}>
                <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                    <div>
                        <IoIosClose />
                    </div>
                </IconContext.Provider>
                </div>
                <div className='movie_detail bg-cover h-full w-full' style={{backgroundImage: `url(${base_url}${selectedMovie.backdrop_path})`}}></div>
                <div className="bg-text flex pt-12 grid">
                    <div className="movie_img sm:h-96 sm:w-1/5 w-1/2 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md border-netflix-black shadow-lg shadow-netflix-black sm:ml-12 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${base_url}${selectedMovie.poster_path})`}}>
                    </div>
                    <div className='movie_desc sm:pl-12 mt-8 w-4/5'>
                        <div className='flex mb-4'>
                            {processGenres(selectedMovie.genre_ids)}
                        </div>
                        <h1 className='sm:text-5xl text-2xl drop-shadow-6xl shadow-netflix-black text-left mb-4'>{selectedMovie.title || selectedMovie.name}</h1>
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
