import { controls } from '@boilerplate-ts-webmodule/utils'
import { type Props, type Data } from '@boilerplate-ts-webmodule/types'
import { create } from '..'
import json from './data.json'

function init(container: Element) {
  const props: Props = {
    divider: ' ',
  }

  const data = json as Data
  const update = create(container, props, data)

  controls.createForm(props, {}, (mutation: Partial<Props>) => {
    update(mutation)
  })
}

document.body.querySelectorAll('.module').forEach((element) => {
  if (!element.childNodes.length) {
    init(element)
  }
})
