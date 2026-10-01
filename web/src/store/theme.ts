import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeBackground {
  main: string;
  secondary: string;
  secondaryHighlight: string;
  slotEmpty: string;
  overlay: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface ThemeText {
  primary: string;
  secondary: string;
  muted: string;
  disabled: string;
  onAccent: string;
  onDark: string;
}

export interface ThemeAccent {
  base: string;
  light: string;
  hover: string;
  hoverDark: string;
  border: string;
  borderMuted: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface ThemeBorder {
  subtle: string;
  medium: string;
  accent: string;
  input: string;
}

export interface ThemeSemanticState {
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;
  dangerHover: string;
  dangerAlt: string;
  info: string;
}

export interface ThemeSlot {
  emptyBg: string;
  filledBg: string;
  hoverBg: string;
  disabledBg: string;
  border: string;
}

export interface ThemeTooltip {
  background: string;
  gradientFrom: string;
  gradientTo: string;
  border: string;
  borderAccent: string;
  headerGradientFrom: string;
  headerGradientTo: string;
  itemHoverFrom: string;
  itemHoverTo: string;
}

export interface ThemeWeightBar {
  normalFrom: string;
  normalTo: string;
  warningFrom: string;
  warningTo: string;
  criticalFrom: string;
  criticalTo: string;
  background: string;
  border: string;
}

export interface ThemeDurability {
  high: string;
  medium: string;
  low: string;
  background: string;
  gradientFrom: string;
  gradientTo: string;
  border: string;
}

export interface ThemeNotification {
  background: string;
  itemBackground: string;
  added: string;
  removed: string;
  border: string;
}

export interface ThemeShop {
  cardBackground: string;
  cardHover: string;
  priceColor: string;
  removeBtnColor: string;
  removeBtnHover: string;
  successColor: string;
  accentHover: string;
}

export interface ThemeHud {
  health: string;
  armor: string;
  hunger: string;
  thirst: string;
  barBackground: string;
  containerBg: string;
}

export interface ThemeRarityEntry {
  border: string;
  badge: string;
}

export interface ThemeRarity {
  common: ThemeRarityEntry;
  rare: ThemeRarityEntry;
  epic: ThemeRarityEntry;
  legendary: ThemeRarityEntry;
}

export interface ThemeClothing {
  activeFrom: string;
  activeTo: string;
  activeBorder: string;
  inactiveBg: string;
  inactiveBorder: string;
  buttonBg: string;
  buttonHover: string;
  buttonToggled: string;
  scrollbar: string;
}

export interface ThemeDropZone {
  background: string;
  backgroundHover: string;
  border: string;
  text: string;
}

export interface ThemeSpecial {
  neonGreen: string;
  neonGreenBg: string;
  neonGreenBorder: string;
  blueBadge: string;
}

export interface ThemeState {
  background: ThemeBackground;
  text: ThemeText;
  accent: ThemeAccent;
  border: ThemeBorder;
  state: ThemeSemanticState;
  slot: ThemeSlot;
  tooltip: ThemeTooltip;
  weightBar: ThemeWeightBar;
  durability: ThemeDurability;
  notification: ThemeNotification;
  shop: ThemeShop;
  hud: ThemeHud;
  rarity: ThemeRarity;
  clothing: ThemeClothing;
  dropZone: ThemeDropZone;
  special: ThemeSpecial;
}

export const initialState: ThemeState = {
  background: {
    main: '#17191d',
    secondary: 'rgba(42,45,53,0.8)',
    secondaryHighlight: '#2a2d35',
    slotEmpty: 'rgba(102, 255, 0, 0.9)',
    overlay: 'rgba(0,0,0,0.4)',
    gradientFrom: '#1a1d23',
    gradientTo: '#22252c',
  },
  text: {
    primary: '#dedede',
    secondary: '#8a8d95',
    muted: 'rgba(222,222,222,0.7)',
    disabled: '#6a6d75',
    onAccent: '#ffffff',
    onDark: '#0A0A0A',
  },
  accent: {
    base: '#6c3bff',
    light: 'rgba(108,59,255,0.15)',
    hover: '#8b5cf6',
    hoverDark: '#5a2fd9',
    border: 'rgba(108,59,255,0.6)',
    borderMuted: 'rgba(108,59,255,0.4)',
    gradientFrom: '#6c3bff',
    gradientTo: '#8b5cf6',
  },
  border: {
    subtle: 'rgba(255,255,255,0.1)',
    medium: 'rgba(255,255,255,0.2)',
    accent: '#6c3bff',
    input: '#2a2d35',
  },
  state: {
    success: '#22c55e',
    successBg: 'rgba(34,197,94,0.15)',
    warning: '#f59e0b',
    warningBg: 'rgba(245,158,11,0.15)',
    danger: '#dd3939',
    dangerBg: 'rgba(221,57,57,0.1)',
    dangerHover: 'rgba(221,57,57,0.2)',
    dangerAlt: '#ef4444',
    info: '#356eff',
  },
  slot: {
    emptyBg: 'rgba(42,45,53,0.25)',
    filledBg: '#2a2d35',
    hoverBg: '#323540',
    disabledBg: '#3a3d45',
    border: 'rgba(255,255,255,0.1)',
  },
  tooltip: {
    background: '#17191d',
    gradientFrom: '#1a1d23',
    gradientTo: '#22252c',
    border: 'rgba(255,255,255,0.1)',
    borderAccent: '#6c3bff',
    headerGradientFrom: '#6c3bff',
    headerGradientTo: '#8b5cf6',
    itemHoverFrom: 'rgba(108,59,255,0.2)',
    itemHoverTo: 'rgba(139,92,246,0.2)',
  },
  weightBar: {
    normalFrom: '#6c3bff',
    normalTo: '#8b5cf6',
    warningFrom: '#7c4dff',
    warningTo: '#9d66ff',
    criticalFrom: '#9d66ff',
    criticalTo: '#b794f6',
    background: 'rgba(0,0,0,0.3)',
    border: 'rgba(255,255,255,0.1)',
  },
  durability: {
    high: '#22c55e',
    medium: '#f59e0b',
    low: '#ef4444',
    background: 'rgba(0,0,0,0.3)',
    gradientFrom: '#1a1d23',
    gradientTo: '#22252c',
    border: 'rgba(255,255,255,0.1)',
  },
  notification: {
    background: '#2a2d35',
    itemBackground: '#3f4452',
    added: '#22c55e',
    removed: '#dd3939',
    border: 'rgba(255,255,255,0.1)',
  },
  shop: {
    cardBackground: '#2a2d35',
    cardHover: '#323540',
    priceColor: '#00ff00',
    removeBtnColor: '#ff3b3b',
    removeBtnHover: '#e02a2a',
    successColor: '#52e04d',
    accentHover: 'rgba(108,59,255,0.15)',
  },
  hud: {
    health: '#dd3939',
    armor: '#dedede',
    hunger: '#fdbe22',
    thirst: '#356eff',
    barBackground: '#17191d',
    containerBg: 'rgba(42,45,53,0.6)',
  },
  rarity: {
    common: { border: 'rgba(34,197,94,0.4)', badge: '#22c55e' },
    rare: { border: 'rgba(53,110,255,0.4)', badge: '#356eff' },
    epic: { border: 'rgba(108,59,255,0.4)', badge: '#6c3bff' },
    legendary: { border: 'rgba(245,158,11,0.4)', badge: '#f59e0b' },
  },
  clothing: {
    activeFrom: '#a855f7',
    activeTo: '#7e22ce',
    activeBorder: '#c084fc',
    inactiveBg: 'rgba(0,0,0,0.4)',
    inactiveBorder: 'rgba(255,255,255,0.2)',
    buttonBg: '#ffffff',
    buttonHover: 'rgba(17,92,136,0.979)',
    buttonToggled: '#0A0A0A',
    scrollbar: 'rgba(21,151,204,0.5)',
  },
  dropZone: {
    background: 'rgba(221,57,57,0.1)',
    backgroundHover: 'rgba(221,57,57,0.2)',
    border: '#dd3939',
    text: '#dd3939',
  },
  special: {
    neonGreen: '#61fd59',
    neonGreenBg: 'rgba(97,253,89,0.15)',
    neonGreenBorder: 'rgba(97,253,89,0.1)',
    blueBadge: '#356eff',
  },
};

export function applyThemeToCssVars(theme: ThemeState): void {
  const root = document.documentElement;
  const set = (name: string, value: string) => root.style.setProperty(name, value);

  // background
  set('--theme-bg-main', theme.background.main);
  set('--theme-bg-secondary', theme.background.secondary);
  set('--theme-bg-secondary-highlight', theme.background.secondaryHighlight);
  set('--theme-bg-slot-empty', theme.background.slotEmpty);
  set('--theme-bg-overlay', theme.background.overlay);
  set('--theme-bg-gradient-from', theme.background.gradientFrom);
  set('--theme-bg-gradient-to', theme.background.gradientTo);

  // text
  set('--theme-text-primary', theme.text.primary);
  set('--theme-text-secondary', theme.text.secondary);
  set('--theme-text-muted', theme.text.muted);
  set('--theme-text-disabled', theme.text.disabled);
  set('--theme-text-on-accent', theme.text.onAccent);
  set('--theme-text-on-dark', theme.text.onDark);

  // accent
  set('--theme-accent-base', theme.accent.base);
  set('--theme-accent-light', theme.accent.light);
  set('--theme-accent-hover', theme.accent.hover);
  set('--theme-accent-hover-dark', theme.accent.hoverDark);
  set('--theme-accent-border', theme.accent.border);
  set('--theme-accent-border-muted', theme.accent.borderMuted);
  set('--theme-accent-gradient-from', theme.accent.gradientFrom);
  set('--theme-accent-gradient-to', theme.accent.gradientTo);

  // border
  set('--theme-border-subtle', theme.border.subtle);
  set('--theme-border-medium', theme.border.medium);
  set('--theme-border-accent', theme.border.accent);
  set('--theme-border-input', theme.border.input);

  // semantic state
  set('--theme-state-success', theme.state.success);
  set('--theme-state-success-bg', theme.state.successBg);
  set('--theme-state-warning', theme.state.warning);
  set('--theme-state-warning-bg', theme.state.warningBg);
  set('--theme-state-danger', theme.state.danger);
  set('--theme-state-danger-bg', theme.state.dangerBg);
  set('--theme-state-danger-hover', theme.state.dangerHover);
  set('--theme-state-danger-alt', theme.state.dangerAlt);
  set('--theme-state-info', theme.state.info);

  // slot
  set('--theme-slot-empty-bg', theme.slot.emptyBg);
  set('--theme-slot-filled-bg', theme.slot.filledBg);
  set('--theme-slot-hover-bg', theme.slot.hoverBg);
  set('--theme-slot-disabled-bg', theme.slot.disabledBg);
  set('--theme-slot-border', theme.slot.border);

  // tooltip
  set('--theme-tooltip-bg', theme.tooltip.background);
  set('--theme-tooltip-gradient-from', theme.tooltip.gradientFrom);
  set('--theme-tooltip-gradient-to', theme.tooltip.gradientTo);
  set('--theme-tooltip-border', theme.tooltip.border);
  set('--theme-tooltip-border-accent', theme.tooltip.borderAccent);
  set('--theme-tooltip-header-from', theme.tooltip.headerGradientFrom);
  set('--theme-tooltip-header-to', theme.tooltip.headerGradientTo);
  set('--theme-tooltip-item-hover-from', theme.tooltip.itemHoverFrom);
  set('--theme-tooltip-item-hover-to', theme.tooltip.itemHoverTo);

  // weight bar
  set('--theme-weight-normal-from', theme.weightBar.normalFrom);
  set('--theme-weight-normal-to', theme.weightBar.normalTo);
  set('--theme-weight-warning-from', theme.weightBar.warningFrom);
  set('--theme-weight-warning-to', theme.weightBar.warningTo);
  set('--theme-weight-critical-from', theme.weightBar.criticalFrom);
  set('--theme-weight-critical-to', theme.weightBar.criticalTo);
  set('--theme-weight-bg', theme.weightBar.background);
  set('--theme-weight-border', theme.weightBar.border);

  // durability
  set('--theme-durability-high', theme.durability.high);
  set('--theme-durability-medium', theme.durability.medium);
  set('--theme-durability-low', theme.durability.low);
  set('--theme-durability-bg', theme.durability.background);
  set('--theme-durability-gradient-from', theme.durability.gradientFrom);
  set('--theme-durability-gradient-to', theme.durability.gradientTo);
  set('--theme-durability-border', theme.durability.border);

  // notification
  set('--theme-notification-bg', theme.notification.background);
  set('--theme-notification-item-bg', theme.notification.itemBackground);
  set('--theme-notification-added', theme.notification.added);
  set('--theme-notification-removed', theme.notification.removed);
  set('--theme-notification-border', theme.notification.border);

  // shop
  set('--theme-shop-card-bg', theme.shop.cardBackground);
  set('--theme-shop-card-hover', theme.shop.cardHover);
  set('--theme-shop-price', theme.shop.priceColor);
  set('--theme-shop-remove-btn', theme.shop.removeBtnColor);
  set('--theme-shop-remove-btn-hover', theme.shop.removeBtnHover);
  set('--theme-shop-success', theme.shop.successColor);
  set('--theme-shop-accent-hover', theme.shop.accentHover);

  // hud
  set('--theme-hud-health', theme.hud.health);
  set('--theme-hud-armor', theme.hud.armor);
  set('--theme-hud-hunger', theme.hud.hunger);
  set('--theme-hud-thirst', theme.hud.thirst);
  set('--theme-hud-bar-bg', theme.hud.barBackground);
  set('--theme-hud-container-bg', theme.hud.containerBg);

  // rarity
  set('--theme-rarity-common-border', theme.rarity.common.border);
  set('--theme-rarity-common-badge', theme.rarity.common.badge);
  set('--theme-rarity-rare-border', theme.rarity.rare.border);
  set('--theme-rarity-rare-badge', theme.rarity.rare.badge);
  set('--theme-rarity-epic-border', theme.rarity.epic.border);
  set('--theme-rarity-epic-badge', theme.rarity.epic.badge);
  set('--theme-rarity-legendary-border', theme.rarity.legendary.border);
  set('--theme-rarity-legendary-badge', theme.rarity.legendary.badge);

  // clothing
  set('--theme-clothing-active-from', theme.clothing.activeFrom);
  set('--theme-clothing-active-to', theme.clothing.activeTo);
  set('--theme-clothing-active-border', theme.clothing.activeBorder);
  set('--theme-clothing-inactive-bg', theme.clothing.inactiveBg);
  set('--theme-clothing-inactive-border', theme.clothing.inactiveBorder);
  set('--theme-clothing-btn-bg', theme.clothing.buttonBg);
  set('--theme-clothing-btn-hover', theme.clothing.buttonHover);
  set('--theme-clothing-btn-toggled', theme.clothing.buttonToggled);
  set('--theme-clothing-scrollbar', theme.clothing.scrollbar);

  // drop zone
  set('--theme-dropzone-bg', theme.dropZone.background);
  set('--theme-dropzone-bg-hover', theme.dropZone.backgroundHover);
  set('--theme-dropzone-border', theme.dropZone.border);
  set('--theme-dropzone-text', theme.dropZone.text);

  // special
  set('--theme-special-neon-green', theme.special.neonGreen);
  set('--theme-special-neon-green-bg', theme.special.neonGreenBg);
  set('--theme-special-neon-green-border', theme.special.neonGreenBorder);
  set('--theme-special-blue-badge', theme.special.blueBadge);
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<DeepPartial<ThemeState>>) {
      deepMerge(state, action.payload);
      applyThemeToCssVars(state as ThemeState);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;

// ─── helpers ────────────────────────────────────────────────────────────────

export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

function deepMerge(target: Record<string, any>, source: Record<string, any>): void {
  for (const key of Object.keys(source)) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (typeof target[key] === 'object') {
        deepMerge(target[key], source[key]);
      }
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
}
