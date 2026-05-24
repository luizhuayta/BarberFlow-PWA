import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with children text', () => {
    render(<Button>Reservar cita</Button>)
    expect(screen.getByRole('button', { name: /reservar cita/i })).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
  })

  it('supports outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border')
  })
})
