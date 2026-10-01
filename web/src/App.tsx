import InventoryComponent from './components/inventory';
import { ItemNotificationDisplay } from './components/utils/ItemNotifications';
import useNuiEvent from './hooks/useNuiEvent';
import { Items } from './store/items';
import { Locale } from './store/locale';
import { setImagePath } from './store/imagepath';
import { setupInventory } from './store/inventory';
import { Inventory } from './typings';
import { useAppDispatch } from './store';
import { CategoryConfig } from './store/config';
import { debugData } from './utils/debugData';
import DragPreview from './components/utils/DragPreview';
import { fetchNui } from './utils/fetchNui';
import { useDragDropManager } from 'react-dnd';
import KeyPress from './components/utils/KeyPress';
import { closeContextMenu } from './store/contextMenu';
import { closeTooltip } from './store/tooltip';
import { setHUDValues } from './store/hud';
import { setConfig } from './store/config';
import { setTheme, ThemeState, DeepPartial } from './store/theme';
import { useRef } from 'react';

interface HandleCloseClickEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {}

debugData<any>([
  {
    action: 'init',
    data: {
      locale: {},
      items: {},
      leftInventory: {
        id: 'player',
        type: 'player',
        slots: 50,
        label: 'Player',
        weight: 0,
        maxWeight: 5000,
        items: [],
      },
      imagepath: 'images',
    },
  },
  {
    action: 'setupInventory',
    data: {
      leftInventory: {
        id: 'test',
        type: 'player',
        slots: 50,
        label: 'Bob Smith',
        weight: 3000,
        maxWeight: 5000,
        items: [
          {
            slot: 1,
            name: 'iron',
            weight: 3000,
            metadata: {
              description: `Common item - Gray border`,
            },
            count: 5,
          },
          { slot: 2, name: 'copper', weight: 100, count: 12, metadata: { description: 'Rare item - Blue border' } },
          {
            slot: 3,
            name: 'powersaw',
            weight: 0,
            count: 1,
            metadata: {
              durability: 75,
              description: 'Epic item - Purple border',
              serial: 'PWS-2024-8472',
              ammo: 24
            }
          },
          { slot: 4, name: 'diamond', weight: 100, count: 1, metadata: { description: 'Legendary item - Gold border' } },
          { slot: 5, name: 'water', weight: 100, count: 1, metadata: {
              description: 'Common item - Gray border',
              durability: 75,
            }
        },
          { slot: 6, name: 'ruby', weight: 50, count: 2, metadata: { description: 'Legendary item - Gold border' } },
          { slot: 7, name: 'gold_bar', weight: 200, count: 3, metadata: { description: 'Epic item - Purple border' } },
        ],
      },
      rightInventory: {
        id: 'shop-1',
        type: 'shop',
        slots: 50,
        label: 'General Store',
        weight: 0,
        maxWeight: 0,
        items: [
          {
            slot: 1,
            name: 'water',
            weight: 100,
            count: 50,
            metadata: {
              label: 'Water Bottle',
              stock: 50,
              price: 150,
              description: 'Refreshing bottled water'
            }
          },
          {
            slot: 2,
            name: 'bread',
            weight: 50,
            count: 30,
            metadata: {
              label: 'Bread',
              stock: 30,
              price: 200,
              description: 'Fresh baked bread'
            }
          },
          {
            slot: 3,
            name: 'bandage',
            weight: 10,
            count: 20,
            metadata: {
              label: 'Bandage',
              stock: 20,
              price: 500,
              description: 'Medical bandage'
            }
          },
          {
            slot: 4,
            name: 'iron',
            weight: 100,
            count: 100,
            metadata: {
              label: 'Iron Ore',
              stock: 100,
              price: 1250,
              description: 'Iron ore'
            }
          },
          {
            slot: 5,
            name: 'copper',
            weight: 80,
            count: 75,
            metadata: {
              label: 'Copper Ore',
              stock: 75,
              price: 980,
              description: 'Copper ore'
            }
          },
          {
            slot: 6,
            name: 'diamond',
            weight: 10,
            count: 5,
            metadata: {
              label: 'Diamond',
              stock: 5,
              price: 25000,
              description: 'Rare diamond'
            }
          },
          {
            slot: 7,
            name: 'gold_bar',
            weight: 200,
            count: 15,
            metadata: {
              label: 'Gold Bar',
              stock: 15,
              price: 15000,
              description: 'Pure gold bar'
            }
          },
          {
            slot: 8,
            name: 'ruby',
            weight: 15,
            count: 8,
            metadata: {
              label: 'Ruby',
              stock: 8,
              price: 18000,
              description: 'Precious ruby'
            }
          },
          {
            slot: 9,
            name: 'powersaw',
            weight: 500,
            count: 0,
            metadata: {
              label: 'Power Saw',
              stock: 0,
              price: 45000,
              description: 'Professional power saw - OUT OF STOCK'
            }
          },
          {
            slot: 10,
            name: 'water',
            weight: 100,
            count: 999,
            metadata: {
              label: 'Water Bottle',
              price: 150,
              description: 'Unlimited stock water'
            }
          },
        ],
      },
    },
  },
  {
    action: 'setInventoryVisible',
    data: true,
  },
]);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const manager = useDragDropManager();
  useNuiEvent<{
    locale: { [key: string]: string };
    items: typeof Items;
    leftInventory: Inventory;
    imagepath: string;
    config?: { footer?: 'actionbuttons' | 'hud'; showCategories?: boolean; categories?: CategoryConfig[]; showClothingTab?: boolean; showLogo?: boolean; logoFile?: string };
    theme?: DeepPartial<ThemeState>;
  }>('init', ({ locale, items, leftInventory, imagepath, config, theme }) => {
    for (const name in locale) Locale[name] = locale[name];
    for (const name in items) Items[name] = items[name];

    setImagePath(imagepath);
    dispatch(setupInventory({ leftInventory }));

    if (config) dispatch(setConfig(config));
    if (theme) dispatch(setTheme(theme));
  });

  useNuiEvent<{
    health?: number;
    armor?: number;
    hunger?: number;
    thirst?: number;
  }>('updateHUD', (data) => {
    dispatch(setHUDValues(data));
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('closeInventory', () => {
    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });


  return (
    <>
      <div id="ui-root" className="app-wrapper">
        <InventoryComponent />
        <ItemNotificationDisplay />
        <KeyPress />
      </div>
      <DragPreview />
    </>
  );
};

export default App;
