"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
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
    <FilterRadioGroup
      title={t('sort_by')}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
