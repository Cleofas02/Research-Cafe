import React, { useContext } from 'react'
import { ProductsContext } from '../global/ProductsContext';


export const Researches = () => {

    const { products } = useContext(ProductsContext);
    console.log(products)



    return (
        <>
            {products.length !== 0 && <h1 className=' text-center p-3  font-Pop font-bold tracking-wider text-3xl  '>Research</h1>}
            <div >
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div key={product.ProductID}>


                        <div >
                            {product.ProductName}
                        </div>
                        <div >
                            {product.ProductStrand}
                        </div>
                        <div>
                            {product.ProductAuthors}
                        </div>
                        <div >
                            {product.ProductAbstracts}
                        </div>
                        <div>
                            
                        </div>
                        <div >
                            <img src={product.ProductImg} alt="not found" className='w-full h-80' />
                        </div>


                    </div>
                ))}
            </div >
        </>
    )
}
