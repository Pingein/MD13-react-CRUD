import { useState } from 'react'
import { GPU, AxiosParameters } from './assets/interfaces'
import { getData } from './assets/helper'

const URL = 'http://localhost:3001/GPUs/'




const writeRow = (data: string[]) => {
  return (
      <tr className='table__row table__row--body'>
        {data.map(cell => <td className='table__cell table__cell--body'>
          {cell}
        </td>)}
      </tr>
  )
}

function App() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [params, setParams] = useState<AxiosParameters>({_page:page, _limit:limit})



  

  return (
    <div className='container'>


      
      <table className='table'>
        <thead className='table__head'>
          <tr className='table__row table__row--header'>
            <th className='table__cell table__cell--header'>
              manufacturer:
            </th>
            <th className='table__cell table__cell--header'>
              model:
            </th>
            <th className='table__cell table__cell--header'>
              vram:
            </th>
            <th className='table__cell table__cell--header'>
              price:
            </th>
          </tr>
        </thead>

        <tbody className='table__body'>
          {/* {writeRow(['NVIDIA', 'gigabyte GTX 1060', '6gb', '220'])} */}
          {writeRow([''+getData(URL)])}
        </tbody>

      </table>
    </div>
  )
}

export default App
