import { type Props, type Data } from '@boilerplate-ts-webmodule/types'

const create = (container: Element, props: Props, data: Data) => {
  const render = (propsMutation: Partial<Props> = {}, currentData?: Data) => {
    const currentProps = { ...props, ...propsMutation }

    container.textContent = (currentData ?? data).strings.join(
      currentProps.divider
    )
  }

  render()

  return render
}

const defaultProps: Props = {
  divider: ' ',
}

export { create, defaultProps }
