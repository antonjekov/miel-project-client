import React from 'react'
import renderer from "react-test-renderer"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import DiscountInput from '..'

describe('DiscountInput', ()=>{

    afterEach(cleanup)
    it('matches snapshot without error', () => {
        const values = {discount: 10}
        const errors = {}
        const tree = renderer.create( <DiscountInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
    it('matches snapshot with error', () => {
        const values = {discount: 10}
        const errors = {discount: 'Some error'}
        const tree = renderer.create( <DiscountInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })

})
