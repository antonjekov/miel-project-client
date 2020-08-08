import React from 'react'
import renderer from "react-test-renderer"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import AvilabilityInput from '../'

describe('AvailabilityInpuet', ()=>{

    afterEach(cleanup)
    it('matches snapshot without error', () => {
        const values = {availability: 'Available'}
        const errors = {}
        const tree = renderer.create( <AvilabilityInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
    it('matches snapshot with error', () => {
        const values = {availability: 'Available'}
        const errors = {availability: 'Some error'}
        const tree = renderer.create( <AvilabilityInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })

})
