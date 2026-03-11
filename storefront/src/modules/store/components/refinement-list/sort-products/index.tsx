"use client"

import { useTranslations } from 'next-intl';

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  const t = useTranslations('filter');

  const sortOptions = [
    {
      value: "created_at",
      label: t('latest_arrivals')
    },
    {
      value: "price_asc",
      label: t('low_high')
    },
    {
      value: "price_desc",
      label: t('high_low')
    },
  ]

  return (
    <div className="flex flex-col gap-y-3">
      <p className="font-normal font-sans txt-medium txt-compact-small-plus text-ui-fg-muted">
        {t("sort_by")}
      </p>

      <select
        value={sortBy}
        onChange={(e) => handleChange(e.target.value as SortOptions)}
        data-testid={dataTestId}
        className="border rounded-md px-3 py-2 text-sm"
      >
        {sortOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortProducts
