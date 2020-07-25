import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup} from "@testing-library/react"
import renderer from "react-test-renderer"
import ContactPage from "../"
import { useAuth, AuthContext } from  "../../../contexts/Auth";

afterEach(cleanup)

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<ContactPage/>,div)
})

it('matches snapshot', ()=>{
    const tree = renderer.create(<ContactPage/>).toJSON();

    expect(tree).toMatchSnapshot();
})