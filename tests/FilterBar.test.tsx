import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FilterBar from '@/components/ui/FilterBar'

const filters = [
  { value: 'all', label: 'Tout' },
  { value: 'asie', label: 'Asie' },
  { value: 'europe', label: 'Europe' },
]

describe('FilterBar', () => {
  it('renders all filter options', () => {
    render(<FilterBar filters={filters} active="all" onChange={vi.fn()} />)
    expect(screen.getByText('Tout')).toBeInTheDocument()
    expect(screen.getByText('Asie')).toBeInTheDocument()
    expect(screen.getByText('Europe')).toBeInTheDocument()
  })
  it('calls onChange with correct value when clicked', () => {
    const onChange = vi.fn()
    render(<FilterBar filters={filters} active="all" onChange={onChange} />)
    fireEvent.click(screen.getByText('Asie'))
    expect(onChange).toHaveBeenCalledWith('asie')
  })
  it('applies active styles to active filter', () => {
    render(<FilterBar filters={filters} active="asie" onChange={vi.fn()} />)
    const btn = screen.getByText('Asie').closest('button')
    expect(btn?.className).toContain('text-[#c9a96e]')
  })
})
