import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import Counter from './Counter'

const meta = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Counter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    // 初期値が0であることを確認
    await expect(button).toHaveTextContent('Count: 0')

    // ボタンを3回クリック
    await userEvent.click(button)
    await expect(button).toHaveTextContent('Count: 1')

    await userEvent.click(button)
    await expect(button).toHaveTextContent('Count: 2')

    await userEvent.click(button)
    await expect(button).toHaveTextContent('Count: 3')
  }
}
