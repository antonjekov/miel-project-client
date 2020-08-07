import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import renderer from "react-test-renderer"
import AddSubcategoryPage from "../"
import { useAuth, AuthContext } from  "../../../contexts/Auth";

const categories = [{"subcategories":[{"products":["5f04a7adaeddbf1fa829908e","5f0760ce16622b4fe889c12f","5f0ef78e41833358bcd8a048","5f118d00f98210483c402bc6","5f119ab6f98210483c402bc9","5f121c8f8fe94a50fca7d754","5f121e7a8fe94a50fca7d755"],"_id":"5f046a611f1f5d130809bdd1","name":"acacia","category":"5edbd65159792f2e580f5491","description":"Acacia honey has a flower-like aroma and sweet, delicate flavor. Conveniently, acacia honey remains liquid longer and crystallizes much slower than traditional honey.","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594124893/hbezpw1k9wzxgth1yovb.jpg","__v":0},{"products":["5f104758c3c17345f8dcfde6"],"_id":"5f046c6629be1c3b3c47409a","name":"chesnut","category":"5edbd65159792f2e580f5491","description":"Chestnut honey has a strong aromatic taste and a slightly bitter after taste. Rich in pollen content, mineral salts and tannin. Resists crystallization and a relatively low acidity.","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594125411/vyoqo3xvymgnfxvzkxlu.jpg","__v":0},{"products":[],"_id":"5f046d7729be1c3b3c47409b","name":"flowers","category":"5edbd65159792f2e580f5491","description":"Polyfloral honey, also known as wildflower honey, is derived from the nectar of many types of flowers. The taste may vary from year to year, and the aroma and the flavor can be more or less intense.","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594125682/y61ptays5kegiqdbeza9.jpg","__v":0},{"products":[],"_id":"5f046ef129be1c3b3c47409c","name":"forest","category":"5edbd65159792f2e580f5491","description":"Forest honey is a type of honey made not from blossom nectar but from honeydew excreted by plant sucking insects such as aphids. It is usually produced from trees or grasses and plants.","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594126062/lxbglz9q3io7ztyzlhbb.jpg","__v":0},{"products":[],"_id":"5f047c9a29be1c3b3c47409d","name":"rosemary","category":"5edbd65159792f2e580f5491","description":"Rosemary honey has a thick texture and has a color that reminiscent of amber.","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594129422/dr8t71rpka7tqbzercka.jpg","__v":0}],"_id":"5edbd65159792f2e580f5491","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594107562/it7xvfrjp585dprqk4zm.jpg","name":"honey"},{"subcategories":[{"products":["5f057448ee3bca23e884a447","5f057cd8ee3bca23e884a448","5f058069ee3bca23e884a449","5f072b1b276db4521c0e8f22","5f073f0c3af80439e4f51c2c","5f0742763af80439e4f51c2e"],"_id":"5f05703fee3bca23e884a445","name":"shampoos","category":"5edc2404d1fa4095ec7e954b","description":"Shampoos with honey are potent treatment for hair growth.","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594191751/gzz5mtrlfpcnlvadmmfr.jpg","__v":0},{"products":[],"_id":"5f05721aee3bca23e884a446","name":"creams","category":"5edc2404d1fa4095ec7e954b","description":"Honey creams are suitable for every skin.","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594192262/pgd6vsdpdnqaxwskqxk3.jpg","__v":0},{"products":[],"_id":"5f1216b28fe94a50fca7d753","name":"soap","category":"5edc2404d1fa4095ec7e954b","description":"It imparts a light, warm, sweet scent, the added sugar content helps increase the lather, and acts as a humectant. ","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1595020976/yfruthvs8wepr0t8pwvc.jpg","__v":0}],"_id":"5edc2404d1fa4095ec7e954b","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594062636/x7vjswvaputd0zxzbq6b.jpg","name":"cosmetics"},{"subcategories":[],"_id":"5edc2450d1fa4095ec7e954c","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594073025/ogofpdqufca1l0dx0ktc.jpg","name":"other bee products"},{"subcategories":[],"_id":"5edc246bd1fa4095ec7e954d","imageUrl":"https://res.cloudinary.com/mielproject/image/upload/v1594106866/qwlzv2hv1cfqwgy6bybz.jpg","name":"apitherapy"}]

afterEach(cleanup)

const setUserInfo =()=>{}
test("inputs subcategory and description update on change", () =>{
    const {queryByPlaceholderText, queryByText} = render(
    <AuthContext.Provider value={{ categories:categories}}>
      <AddSubcategoryPage/>
    </AuthContext.Provider>)
    const nameInput = queryByPlaceholderText('Enter name')
    fireEvent.change(nameInput,{target:{value: 'subcategory'}})
    expect(nameInput.value).toBe('subcategory')
    
    const descriptionInput = queryByPlaceholderText('Description')
    fireEvent.change(descriptionInput,{target:{value: 'description'}})
    expect(descriptionInput.value).toBe('description')
    
  })

  
  it('matches snapshot', ()=>{
    const tree = renderer.create(
        <AuthContext.Provider value={{ categories:categories}}>
            <AddSubcategoryPage/>
        </AuthContext.Provider>
   ).toJSON();
  
    expect(tree).toMatchSnapshot();
  })

  