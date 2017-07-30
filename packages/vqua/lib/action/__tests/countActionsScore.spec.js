const {
  INSERT_NODE, CREATE_NODE, UPDATE_NODE, REPLACE_NODE, DELETE_NODE
} = require('../../constants/actionTypes')
const countActionsScore = require('../countActionsScore')

describe('Count actions score for', () => {

  it('create action', () => {
    expect(
      countActionsScore([ CREATE_NODE ])
    ).toBe(1)
  })

  it('delete action', () => {
    expect(
      countActionsScore([ DELETE_NODE ])
    ).toBe(-1)
  })

  it('other actions', () => {
    expect(
      countActionsScore([ INSERT_NODE, UPDATE_NODE, REPLACE_NODE ])
    ).toBe(0)
  })

})
