import type { Preview } from '@storybook/react'
import '../src/client/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <div className='antialiased'>
        <Story />
      </div>
    )
  ]
}

export default preview
