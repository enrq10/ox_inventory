import { CategoryConfig } from '../store/config';

export type ItemCategory = string;

export function getItemCategory(itemName: string, categories: CategoryConfig[]): string {
  const lower = itemName.toLowerCase();
  for (const cat of categories) {
    if (cat.items.includes(lower)) return cat.id;
  }
  return 'all';
}

export function filterItemsByCategory(items: any[], categoryId: string, categories: CategoryConfig[]): any[] {
  if (categoryId === 'all') return items;
  return items.filter(item => {
    if (!item.name) return true;
    return getItemCategory(item.name, categories) === categoryId;
  });
}
