type SortOption = { value: string; label: string }

type Props = {
  options: SortOption[]
  active: string
  onChange: (value: string) => void
}

export default function SortMenu({ options, active, onChange }: Props) {
  return (
    <select
      value={active}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#0d0b09] border border-[#faf9f6]/20 text-[#faf9f6]/70 text-xs uppercase tracking-widest px-3 py-2 focus:outline-none focus:border-[#c9a96e] cursor-pointer"
      aria-label="Trier par"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
