import React, { useState } from "react"
import { MultiSelect } from "./Autocomplete"

export function ComponentSelector({ onSelect, components = [], selectedComponents }) {
  const suggestions = components.map(cmp => ({ label: cmp.name }))

  const selectedItems = selectedComponents.map(cmp => cmp.name)

  const setSelectedItems = items => {
    const selected = components.filter(cmp => items.includes(cmp.name))
    onSelect(selected)
  }

  return <MultiSelect suggestions={suggestions} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
}
