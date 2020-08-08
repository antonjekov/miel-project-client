import React from 'react'
import renderer from "react-test-renderer"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import CategoryInput from '..'

describe('CategoryInput', ()=>{

    afterEach(cleanup)
    it('matches snapshot without error', () => {
        const values = {category: 'honey'}
        const errors = {}
        const tree = renderer.create( <CategoryInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
    it('matches snapshot with error', () => {
        const values = {category: 'honey'}
        const errors = {category: 'Some error'}
        const tree = renderer.create( <CategoryInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })

})
