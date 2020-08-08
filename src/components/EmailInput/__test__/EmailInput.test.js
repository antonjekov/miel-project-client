import React from 'react'
import renderer from "react-test-renderer"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import EmailInput from '..'

describe('EmailInput', ()=>{

    afterEach(cleanup)
    it('matches snapshot without error', () => {
        const values = {username: 'anton@yahoo.com'}
        const errors = {}
        const tree = renderer.create( <EmailInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })
    
    it('matches snapshot with error', () => {
        const values = {username: 'anton@yahoo.com'}
        const errors = {username: 'Some error'}
        const tree = renderer.create( <EmailInput values={values} errors={errors} handleChange={()=>{}}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    })

})
