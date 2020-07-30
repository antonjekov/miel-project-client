import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import renderer from "react-test-renderer"
import SendMessage from "../"

afterEach(cleanup)

test("inputs update on change", () =>{
    const {queryByPlaceholderText, queryByText} = render(<SendMessage/>)
    const nameInput = queryByPlaceholderText('Enter your name')
    fireEvent.change(nameInput,{target:{value: 'Anton'}})
    expect(nameInput.value).toBe('Anton')
    const emailInput = queryByPlaceholderText('Enter email')
    fireEvent.change(emailInput,{target:{value: 'anton@yahoo.com'}})
    expect(emailInput.value).toBe('anton@yahoo.com')
  })

  it('matches snapshot', ()=>{
    const tree = renderer.create(<SendMessage/>).toJSON();
  
    expect(tree).toMatchSnapshot();
  })