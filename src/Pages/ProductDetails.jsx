import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import Swal from 'sweetalert2'

const ProductDetails = () => {

    let { id } = useParams()
    let [Product, setProduct] = useState({})

    let [Quantity, setQuantity] = useState(1)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let cart_items = useSelector(store=>store.cartStore.cart_items)
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.log(error))
    }, [id])
    const handleSubmit = (e) => {
        e.preventDefault()

let itemExits =cart_items.find(item=>item.id === Product.id)
if (itemExits){
Swal.fire({
    title:"Alert",
    text:"Item already in cart.Do you wish to add more ?",
    icon:"warning",
    showDenyButton:true,
    cancelButtonColor:'#aa0000'
    
})
.then(result=>{
    if (result.isConfirmed){
        let new_quantity = itemExits.quantity + Quantity
        if (new_quantity > itemExits.stock){
            Swal.fire("Alert","Maximium Quantity reached. Try reducing quantity","Warning")
        }
        else{
            let cart_item = {...itemExits,quantity:new_quantity}
            dispatch({type:"UPDATE_CART",payload:cart_item})
            Swal.fire({
                title: "congrates",
            text: "your item Qantity has been added to cart.Continue shopping",
                icon: "success",
                showCancelButton: true,
                cancelbuttonColor: '#dd0000',
                cancelButtonText: "Go To Cart",
                confirmButtonText: "Continue shopping"
        
        
        
            })
                .then(result => {
                    if (result.isConfirmed) {
        
                        navigate('/')
                    }
                    if (result.isdismissed) {
                        navigate('/cart')
                    }
                })
        }
    }
})
}
else{
    let cart_item = { ...Product, quantity: Quantity, cart_id: Date.now() }
    // console.log(cart_item)
    dispatch({ type: "ADD_TO_CART", payload: cart_item })
    // Swal.fire("congrates","Item added to Cart.", "success")

    Swal.fire({
        title: "congrates",
        text: "your item has been placed on cart.Continue shopping",
        icon: "success",
        showCancelButton: true,
        cancelbuttonColor: '#dd0000',
        cancelButtonText: "Go To Cart",
        confirmButtonText: "Continue shopping"



    })
        .then(result => {
            if (result.isConfirmed) {

                navigate('/')
            }
            if (result.isdismissed) {
                navigate('/cart')
            }
        })
}
        
    }

    return (
        <>
            <div className="container mx-auto my-3">
                <div className="row align-items-center">
                    <div className="col-md-6 p-5">
                        {
                            Product && Product.images &&
                            <img src={Product.images[0]} alt="" className='w-100' />
                        }
                    </div>
                    <div className="col-md-6 p-5">
                        {<h2 >{Product.title}</h2>}
                        {<h3 >${Product.price}</h3>}
                        {<p>Product Details:{Product.description}</p>}
                        {<h3 >IN Stock:{Product.stock}</h3>}
                        <h3>Ratings:
                            <StarRatings
                                rating={Product.rating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                starDimension="36px"

                            />
                        </h3>
                        <div className="d-flex w-50">
                            <h3>Quantity:</h3>
                            <input type="number" className='form-control ms-4' min={1} max={Product.stock} value={Quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                        </div>

                        <button className='btn btn-warning w-100 my-3 ' onClick={handleSubmit}>Add To Cart</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductDetails