import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import MainContainer from '../../../components/MainContainer'
import { fetchTeammate } from '../../../http/teammateAPI'
import Loader from '../../../components/Loader'

export default function Teammate({ data }) {
  const { isAuth } = useSelector((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth])

  return isAuth ? (
    <MainContainer>
      <div>
        <h1>Имя сотрудника: {data.name}</h1>
        <h2>Id сотрудника: {data._id}</h2>
      </div>
    </MainContainer>
  ) : (
    <Loader />
  )
}

export async function getServerSideProps({ params }) {
  const { data } = await fetchTeammate(params.id)

  return {
    props: { data },
  }
}
