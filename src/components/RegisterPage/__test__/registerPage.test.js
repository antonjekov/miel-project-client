import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import renderer from "react-test-renderer"
import RegisterPage from "../"
import { useAuth, AuthContext } from  "../../../contexts/Auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";

afterEach(cleanup)

const setUserInfo =()=>{}
test("inputs update on change", () =>{
    const {queryByPlaceholderText, queryByText} = render(<BrowserRouter><AuthContext.Provider value={{ setUserInfo}}><RegisterPage/></AuthContext.Provider></BrowserRouter>)
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
    <BrowserRouter><AuthContext.Provider value={{setUserInfo}}>
          <RegisterPage/>
      </AuthContext.Provider></BrowserRouter>
 ).toJSON();

  expect(tree).toMatchSnapshot();
})