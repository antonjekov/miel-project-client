import React from "react";
import ReactDOM from "react-dom"
import {render, cleanup} from "@testing-library/react"
import renderer from "react-test-renderer"
import NavigationControls from "../"
import { useAuth, AuthContext } from "../../../contexts/Auth";

const userAdmin = {"_id":"5f073d023af80439e4f51c2a","name":"admin","username":"admin@yahoo.com","role":"admin","shoppingCard":[]}

const userClient = {"_id":"5f073d613af80439e4f51c2b","name":"anton","username":"anton@yahoo.com","role":"client","shoppingCard":["5f073f0c3af80439e4f51c2c","5f073f0c3af80439e4f51c2c"]}

afterEach(cleanup)

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<AuthContext.Provider value={{ userInfo:userAdmin}}>
                            <NavigationControls />
                        </AuthContext.Provider>                    
                    ,div)
})

//Snapshot tests
it('matches snapshot admin', ()=>{
    const tree = renderer.create(
        <AuthContext.Provider value={{ userInfo:userAdmin}}>
            <NavigationControls/>
        </AuthContext.Provider>
   ).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot client', ()=>{
    const tree = renderer.create(
        <AuthContext.Provider value={{ userInfo:userClient}}>
            <NavigationControls/>
        </AuthContext.Provider>
   ).toJSON();
    expect(tree).toMatchSnapshot();
})
it('matches snapshot without user', ()=>{
    const tree = renderer.create(
        <AuthContext.Provider value={{ userInfo:null}}>
            <NavigationControls/>
        </AuthContext.Provider>
   ).toJSON();
    expect(tree).toMatchSnapshot();
})