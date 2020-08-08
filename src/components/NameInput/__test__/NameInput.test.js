import React from 'react'
import renderer from "react-test-renderer"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import NameInput from '..'

describe('NameInput', ()=>{

    afterEach(cleanup)
    it('matches snapshot without error', () => {
        const values = {name: 'Anton'}
        const errors = {}
        const tree = renderer.create( <NameInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
    it('matches snapshot with error', () => {
        const values = {name: 'Anton'}
        const errors = {name: 'Some error'}
        const tree = renderer.create( <NameInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })

})
