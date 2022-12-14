import { atom, DefaultValue } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const userAtom = atom({
    key: 'current_user',
    default: undefined,
    effects: [
        persistAtom
    ]
})

const LocalMoviesAtom = atom({
    key: 'local_movies',
    default: [],
    effects: [
        persistAtom
    ]
})

const profileAtom = atom({
    key: 'current_profile',
    default: {},
    effects: [
        persistAtom
    ]
})

const showMovieDetailAtom = atom({
    key: 'showDetail',
    default: false
})

const selectedMovieAtom = atom({
    key: 'selectedMovie',
    default: {}
})

export {userAtom, showMovieDetailAtom, selectedMovieAtom, profileAtom, LocalMoviesAtom}