import React from 'react'
import renderer from "react-test-renderer"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import DescriptionInput from '..'

describe('DescriptionInput', ()=>{

    afterEach(cleanup)
    it('matches snapshot without error', () => {
        const values = {description: 'some description'}
        const errors = {}
        const tree = renderer.create( <DescriptionInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
    it('matches snapshot with error', () => {
        const values = {description: 'some description'}
        const errors = {description: 'Some error'}
        const tree = renderer.create( <DescriptionInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })

})
