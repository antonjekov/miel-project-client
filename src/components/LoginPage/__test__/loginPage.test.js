import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import renderer from "react-test-renderer"
import Login from "../"
import { useAuth, AuthContext } from  "../../../contexts/Auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";


afterEach(cleanup)

const setUserInfo =()=>{}
test("inputs update on change", () =>{
    const {queryByPlaceholderText, queryByText} = render(
    <BrowserRouter>
    <AuthContext.Provider value={{ setUserInfo}}>
      <Login/>
    </AuthContext.Provider>
    </BrowserRouter>)
    const userInput = queryByPlaceholderText('Enter email')
    fireEvent.change(userInput,{target:{value: 'test'}})
    expect(userInput.value).toBe('test')
    const passwordInput = queryByPlaceholderText('Enter your password')
    fireEvent.change(passwordInput,{target:{value: '123456'}})
    expect(passwordInput.value).toBe('123456')
  })

  it('matches snapshot', ()=>{
    const tree = renderer.create(
      <BrowserRouter>
        <AuthContext.Provider value={{setUserInfo}}>
            <Login/>
        </AuthContext.Provider>
      </BrowserRouter>
   ).toJSON();
  
    expect(tree).toMatchSnapshot();
  })