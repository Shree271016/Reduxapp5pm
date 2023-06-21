import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Components/Card'

const Home = () => {
  let items = useSelector(store => store.itemStore.items)
  let [count, setCount] = useState(8)
  let dispatch = useDispatch()

  const load_data = () => {
    fetch(`https://dummyjson.com/products`)
      .then(Response => Response.json())
      .then(data => dispatch({ type: "LOAD_DATA", payload: data.products.slice(0, count) }))
      .catch(err => console.log(err))

  }
  useEffect(load_data, [count])
  console.log(items)
  return (
    <>
      <div className="bg-secondary-subtle py-2" >
        <input type='search' className='form-control w-50 m-auto' placeholder='enter your search here' />
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">

          {
            items.length > 0 &&
            items.map(item => {
              return <Card key={item.id} item={item} />
            })
          }
        </div>
      </div>
      {count < 30 ?
        <button className=' btn btn-warning w-100 btn-small' onClick={() => { return setCount(count + 4) }}>Load More</button>
        :
        <div className='text-center h4'>All Items Loaded</div>
      }
    </>
  )
}

export default Home