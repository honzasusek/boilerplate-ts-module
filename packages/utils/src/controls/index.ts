// eslint-disable-next-line import/no-extraneous-dependencies
import merge from 'lodash.merge'
// import styles from './style.css'

const wrapInput = (name: string, content: string) =>
  `<label><span>${name}:</span>${content}</label>`

export const deserialize = (name: string, value: string | number) => {
  if (name.includes('.')) {
    const valueName = name.split('.').slice(-1)[0]
    const recordName = name.split('.').slice(0, -1).join('.')
    const isNumber = /^\d+$/u.test(value.toString())

    return {
      [recordName]: {
        [valueName]: isNumber ? parseInt(value.toString(), 10) : value,
      },
    }
  }

  return { [name]: value }
}

type Exception = (name: string, value: string) => string

const createControlsRecursive = (
  value: string | number | [],
  name: string,
  exceptions?: Record<string, Exception>
): string => {
  if (exceptions) {
    const exceptionKey = Object.keys(exceptions).find((key) =>
      name.includes(key)
    )

    if (exceptionKey) {
      return wrapInput(name, exceptions[exceptionKey](name, value.toString()))
    }
  }

  if (typeof value === 'string') {
    if (/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/u.test(value)) {
      return wrapInput(
        name,
        `<input type="color" name="${name}" value="${value}" />`
      )
    }

    return wrapInput(name, `<input name="${name}" value="${value}" />`)
  }

  if (typeof value === 'number')
    return wrapInput(
      name,
      `<input style="width: 80px" type="number" name="${name}" placeholder="${name}" value="${value}" />`
    )

  if (Array.isArray(value))
    return value
      .map((item: string | number, index: number) =>
        createControlsRecursive(item, `${name}.${index}`, exceptions)
      )
      .join('')

  return Object.keys(value)
    .reduce(
      (reduction: string[], key) => [
        ...reduction,
        createControlsRecursive(value[key], `${name}.${key}`, exceptions),
      ],
      []
    )
    .join('')
}

const createControls = (
  value: Record<string, string | number>,
  exceptions?: Record<string, Exception>
) =>
  Object.keys(value)
    .reduce(
      (reduction: string[], key) => [
        ...reduction,
        createControlsRecursive(value[key], `${key}`, exceptions),
      ],
      []
    )
    .join('')

export const createForm = <Values extends Record<string, string | number>>(
  initialValues: Values,
  exceptions: Record<string, Exception>,
  onUpdate: (values: Values) => void
) => {
  const form = document.createElement('form')

  form.setAttribute(
    'style',
    `
    position: fixed;
    padding: 10px;
    line-height: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 1000;
  `
  )

  form.innerHTML = createControls(initialValues, exceptions)

  form.addEventListener('change', (changeEvent) => {
    const data = new FormData(
      changeEvent.currentTarget as HTMLFormElement
    ) as unknown as {
      entries(): Iterable<readonly unknown[]>
    }

    const fields: Values = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      data.entries()
    )

    const newValues: Values = Object.keys(fields).reduce(
      (reduction, key) => merge(reduction, deserialize(key, fields[key])),
      {}
    ) as Values

    // resizeContainer(width, height)
    onUpdate(newValues)
  })

  document.body.append(form)
}
