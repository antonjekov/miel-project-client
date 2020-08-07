import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import renderer from "react-test-renderer"
import RegisterPage from "../"
import { useAuth, AuthContext } from  "../../../contexts/Auth";

afterEach(cleanup)

const setUserInfo =()=>{}
test("inputs update on change", () =>{
    const {queryByPlaceholderText, queryByText} = render(<AuthContext.Provider value={{ setUserInfo}}><RegisterPage/></AuthContext.Provider>)
    const nameInput = queryByPlaceholderText('Enter name')
    fireEvent.change(nameInput, {target:{value: 'Anton'}})
    expect(nameInput.value).toBe('Anton')
    const emailInput = queryByPlaceholderText('Enter email')
    fireEvent.change(emailInput,{target:{value: 'email'}})
    expect(emailInput.value).toBe('email')
    const passwordInput = queryByPlaceholderText('Enter your password')
    fireEvent.change(passwordInput,{target:{value: '123456'}})
    expect(passwordInput.value).toBe('123456')
    const repasswordInput = queryByPlaceholderText('Repeat Password')
    fireEvent.change(repasswordInput,{target:{value: '123456'}})
    expect(repasswordInput.value).toBe('123456')
  })

  //Snapshot tests
it('matches snapshot', ()=>{
  const tree = renderer.create(
      <AuthContext.Provider value={{setUserInfo}}>
          <RegisterPage/>
      </AuthContext.Provider>
 ).toJSON();

  expect(tree).toMatchSnapshot();
})