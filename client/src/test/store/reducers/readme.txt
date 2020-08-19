What these tests are assessing: 

    - That action creators are defined and reducers return the current 
        state as a default (sanity tests)

    - That action creators are called through the reducers and return 
        expected values 

    - That action creators do not effect the state that the reducer is 
        responsible for (outside of their explicit purpose)

What these tests are not assessing:

    - The quality of data that is derived from or manipulated by calls 
        to Mongo (this is done in model testing, server-side)


