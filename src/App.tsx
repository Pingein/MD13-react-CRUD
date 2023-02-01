import { useState, useEffect } from 'react'
import { GPU, AxiosParameters } from './assets/interfaces'
//import { getData } from './assets/helper'
import axios from 'axios'

const URL = 'http://localhost:3001/GPUs/'

const getData = async (url:string, params?:AxiosParameters)  => {
  let data = await axios.get(url, {params:params}).then(res => res.data)
  console.log(data)
  return (
    {data}
  )
}


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
  const [table, setTable] = useState<GPU[]>([])
  const [params, setParams] = useState<AxiosParameters>({_page:page, _limit:limit})

  const updateTable = () => {
    axios.get(URL).then(res => {
      setTable(res.data)
    })
  }

  useEffect(() => {
    updateTable()
  }, [])

  if (!table) {
    return
  }

  return (

    <div className="App">
      <div className="container">
        <form className='form'>
          <input className='form__manufacturer' type="text" placeholder='manufacturer'/>
          <input className='form__vendor' type="text" placeholder='vendor'/>
          <input className='form__model' type="text" placeholder='model'/>
          <input className='form__vram' type="number" placeholder='vram'/>
          <input className='form__price' type="number" placeholder='price'/>
          <button className='form__submit' type="submit" onClick={(e) => {
            e.preventDefault()
            if (!(e.currentTarget.parentElement && e.currentTarget.parentElement.childNodes)) {
              return
            }

            let form:NodeListOf<ChildNode> = e.currentTarget.parentElement.childNodes

            let manufacturer = (form[0] as HTMLInputElement).value.toLocaleUpperCase()
            let vendor = (form[1] as HTMLInputElement).value.toLocaleLowerCase()
            let model = (form[2] as HTMLInputElement).value.toLocaleUpperCase()
            let vram = +(form[3] as HTMLInputElement).value
            let price = +(form[4] as HTMLInputElement).value

            if (manufacturer && vendor && model && vram && price) {
              let new_gpu:GPU =  {
                manufacturer,
                vendor,
                model,
                vram,
                price
              }
              console.log(new_gpu)
              axios.post(URL, new_gpu).then(_ => updateTable())
            }
          }}>ADD</button>
        </form>
      </div>

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
            {table.map(row => {
              return (
                <tr>
                  <td>
                    {row.manufacturer}
                  </td>
                  <td>
                    {`${row.vendor} ${row.model}`}
                  </td>
                  <td>
                    {`${row.vram}GB`}
                  </td>
                  <td>
                    {`${row.price}e`}
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>
    </div>

  )
}

export default App
