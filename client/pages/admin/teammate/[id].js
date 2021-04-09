import MainContainer from '../../../components/MainContainer'
import { fetchTeammate } from '../../../http/teammateAPI'

export default function teammate({data}) {
    return (
        <MainContainer>
            <div>
                <h1>Имя сотрудника: {data.name}</h1>
                <h2>Id сотрудника: {data._id}</h2>
            </div>
        </MainContainer>
    )

}

export async function getServerSideProps({params}) {
    const {data} = await fetchTeammate(params.id)

    return {
      props: {data}, 
    }
}