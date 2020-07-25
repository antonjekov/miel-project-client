import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup, screen} from "@testing-library/react"
import renderer from "react-test-renderer"
import ProductCard from "../"
import { useAuth, AuthContext } from  "../../../contexts/Auth";

const productAvailable = {"_id":"5f073f0c3af80439e4f51c2c","name":"shampoo","category":"5edc2404d1fa4095ec7e954b","subcategory":"5f05703fee3bca23e884a445","price":5,"availability":"Available","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594310410/pfgki1klwc77ks9wfb5e.jpg"}

const productNotAvailable = {"_id":"5f0742763af80439e4f51c2e","name":"shampoo not available","category":"5edc2404d1fa4095ec7e954b","subcategory":"5f05703fee3bca23e884a445","price":6,"availability":"Not available","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594311284/kudbcmswwf7t03a7lht0.jpg"}


const userAdmin = {"_id":"5f073d023af80439e4f51c2a","name":"admin","username":"admin@yahoo.com","role":"admin","shoppingCard":[]}

const userClient = {"_id":"5f073d613af80439e4f51c2b","name":"anton","username":"anton@yahoo.com","role":"client","shoppingCard":["5f073f0c3af80439e4f51c2c","5f073f0c3af80439e4f51c2c"]}

const setUserInfo =()=>{}

afterEach(cleanup)

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<AuthContext.Provider value={{ userInfo:userAdmin, setUserInfo}}>
                            <ProductCard product={productAvailable}/>
                        </AuthContext.Provider>                    
                    ,div)
})

test("displays correct button 'Delete product'", () =>{
    render(<AuthContext.Provider value={{ userInfo:userAdmin, setUserInfo}}>
        <ProductCard product={productAvailable}/>
    </AuthContext.Provider>
    )
    expect(screen.getByText("Delete product")).toBeVisible()
    const addButton = screen.queryByText("Add to Shopping Card")
    expect(addButton).not.toBeInTheDocument()
  })

  test("displays correct button 'Add to Shopping Card'", () =>{
    render(<AuthContext.Provider value={{ userInfo:userClient, setUserInfo}}>
        <ProductCard product={productAvailable}/>
    </AuthContext.Provider>
    )
    expect(screen.getByText("Add to Shopping Card")).toBeVisible()
    const deleteButton = screen.queryByText("Delete product")
    expect(deleteButton).not.toBeInTheDocument()
  })

test("not display buttons", () =>{
    render(<AuthContext.Provider value={{ userInfo:userClient, setUserInfo}}>
        <ProductCard product={productNotAvailable}/>
    </AuthContext.Provider>
    )
    const deleteButton = screen.queryByText("Delete product")
    expect(deleteButton).not.toBeInTheDocument()
    const addButton = screen.queryByText("Add to Shopping Card")
    expect(addButton).not.toBeInTheDocument()
  })

//Snapshot tests
it('matches snapshot admin', ()=>{
    const tree = renderer.create(
        <AuthContext.Provider value={{ userInfo:userAdmin, setUserInfo}}>
            <ProductCard product={productAvailable}/>
        </AuthContext.Provider>
   ).toJSON();

    expect(tree).toMatchSnapshot();
})

it('matches snapshot client product available', ()=>{
    const tree = renderer.create(
        <AuthContext.Provider value={{ userInfo:userClient, setUserInfo}}>
            <ProductCard key={productAvailable._id} product={productAvailable}/>
        </AuthContext.Provider>
   ).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot client product notAvailable', ()=>{
    const tree = renderer.create(
        <AuthContext.Provider value={{ userInfo:userClient, setUserInfo}}>
            <ProductCard key={productNotAvailable._id} product={productNotAvailable}/>
        </AuthContext.Provider>
   ).toJSON();
    expect(tree).toMatchSnapshot();
})