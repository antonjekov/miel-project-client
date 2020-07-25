import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import renderer from "react-test-renderer"
import Login from "../"
import { useAuth, AuthContext } from  "../../../contexts/Auth";

afterEach(cleanup)

const setUserInfo =()=>{}
test("inputs update on change", () =>{
    const {queryByPlaceholderText, queryByText} = render(<AuthContext.Provider value={{ setUserInfo}}><Login/></AuthContext.Provider>)
    const userInput = queryByPlaceholderText('Enter email')
    fireEvent.change(userInput,{target:{value: 'test'}})
    expect(userInput.value).toBe('test')
    const passwordInput = queryByPlaceholderText('Password')
    fireEvent.change(passwordInput,{target:{value: '123456'}})
    expect(passwordInput.value).toBe('123456')
  })