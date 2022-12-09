import React from 'react'
import { useRouter } from 'next/router'

export default function MovieDetail() {
    const router = useRouter()
    const {id} = router.query
    return (
        <div>{id}</div>
    )
}

export async function getServerSideProps(context) {
    return {
      props: {},
    }
  }
  
