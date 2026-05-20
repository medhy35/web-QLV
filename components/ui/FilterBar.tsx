type Filter = { value: string; label: string }

type Props = {
  filters: Filter[]
  active: string
  onChange: (value: string) => void
}

export default function FilterBar({ filters, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtres">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-1.5 text-xs uppercase tracking-widest border transition-all duration-200 ${
            active === f.value
              ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
              : 'border-[#faf9f6]/20 text-[#faf9f6]/60 hover:border-[#faf9f6]/50 hover:text-[#faf9f6]'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
