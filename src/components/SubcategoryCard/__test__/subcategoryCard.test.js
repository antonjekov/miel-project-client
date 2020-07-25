import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup} from "@testing-library/react"
import renderer from "react-test-renderer"
import SubcategoryCard from "../"

const category1 = {"_id":"5edbd65159792f2e580f5491","subcategories":["5f046a611f1f5d130809bdd1","5f046c6629be1c3b3c47409a"],"imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594107562/it7xvfrjp585dprqk4zm.jpg","name":"honey"};
const subcategory1 = {"_id":"5f046a611f1f5d130809bdd1","products":["5f04a7adaeddbf1fa829908e"],"name":"acacia","category":"5edbd65159792f2e580f5491","description":"Acacia honey has a flower-like aroma and sweet, delicate flavor. Conveniently, acacia honey remains liquid longer and crystallizes much slower than traditional honey.","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594124893/hbezpw1k9wzxgth1yovb.jpg"}

afterEach(cleanup)

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<SubcategoryCard category={category1} subcategory={subcategory1}/>,div)
})

it('renders href and image correctly', ()=>{
    const {getByTestId} = render(<SubcategoryCard category={category1} subcategory={subcategory1}/>)
    expect(getByTestId('productsHref')).toHaveTextContent(subcategory1.name)
    expect(getByTestId('productsHref')).toHaveAttribute('href', `/products/${category1._id}/${subcategory1._id}`)
    expect(getByTestId('subcategoryImage')).toHaveAttribute('src', `${subcategory1.imageUrl}`)
})

it('matches snapshot', ()=>{
    const tree = renderer.create(<SubcategoryCard category={category1} subcategory={subcategory1}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

