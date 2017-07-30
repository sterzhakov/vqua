const getCreateAction = require('../getCreateAction')

const {
  CREATE_ROOT, CREATE_TAG, CREATE_TEXT,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = require('../../constants/createNodeTypes')

const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../constants/nodeTypes')

describe('Get create action:', () => {

  it('create root', () => {

    expect(
      getCreateAction(null, { type: ROOT_TYPE, childs: [] })
    ).toBe(CREATE_ROOT)

  })

  it('create text', () => {

    expect(
      getCreateAction(null, { type: TEXT_TYPE, text: 'some text' })
    ).toBe(CREATE_TEXT)

  })

  it('create tag', () => {

    expect(
      getCreateAction(null, { type: TAG_TYPE, tag: 'div' })
    ).toBe(CREATE_TAG)

  })

  it('create instance with existed live node', () => {

    expect(
      getCreateAction(
        { type: INSTANCE_TYPE, instance: new Date },
        { type: CLASS_TYPE, class: Array }
      )
    ).toBe(CREATE_INSTANCE)

  })

  it('create instance with null live node', () => {

    expect(
      getCreateAction(
        null,
        { type: CLASS_TYPE, class: Array }
      )
    ).toBe(CREATE_INSTANCE)

  })

  it('update instance', () => {

    expect(
      getCreateAction(
        { type: INSTANCE_TYPE, instance: { isNeedUpdate: () => true } },
        { type: CLASS_TYPE, class: Object }
      )
    ).toBe(UPDATE_INSTANCE)

  })

  it('resume instance', () => {

    expect(
      getCreateAction(
        { type: INSTANCE_TYPE, instance: { isNeedUpdate: () => false } },
        { type: CLASS_TYPE, class: Object }
      )
    ).toBe(RESUME_INSTANCE)

  })



})
