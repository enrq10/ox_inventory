import { Inventory, SlotWithItem } from '../../typings';
import React, { Fragment, useMemo } from 'react';
import { Items } from '../../store/items';
import { Locale } from '../../store/locale';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../../store';
import ClockIcon from '../utils/icons/ClockIcon';
import { getItemUrl } from '../../helpers';
import AmmoIcon from '../utils/icons/AmmoIcon';
import { FingerPrintIcon } from '../utils/icons/FingerPrintIcon';
import { DurabilityIcon } from '../utils/icons/DurabilityIcon';
import { MouseClickIcon } from '../utils/icons/MouseClickIcon';

const getRarityBadgeColor = (rarity?: string) => {
  switch (rarity) {
    case 'common':    return 'var(--theme-rarity-common-badge)';
    case 'rare':      return 'var(--theme-rarity-rare-badge)';
    case 'epic':      return 'var(--theme-rarity-epic-badge)';
    case 'legendary': return 'var(--theme-rarity-legendary-badge)';
    default:          return null;
  }
};

const SlotTooltip: React.ForwardRefRenderFunction<
  HTMLDivElement,
  { item: SlotWithItem; inventoryType: Inventory['type']; style: React.CSSProperties }
> = ({ item, inventoryType, style }, ref) => {
  const additionalMetadata = useAppSelector((state) => state.inventory.additionalMetadata);
  const itemData = useMemo(() => Items[item.name], [item]);
  const ingredients = useMemo(() => {
    if (!item.ingredients) return null;
    return Object.entries(item.ingredients).sort((a, b) => a[1] - b[1]);
  }, [item]);

  const label = item.metadata?.label || itemData?.label || item.name;
  const description = item.metadata?.description || itemData?.description;
  const ammoName = itemData?.ammoName && Items[itemData?.ammoName]?.label;
  const rarity = itemData?.rarity;
  const rarityColor = getRarityBadgeColor(rarity);

  const weightDisplay = useMemo(() => {
    if (item.weight <= 0) return null;
    return item.weight >= 1000
      ? `${(item.weight / 1000).toLocaleString('en-us', { minimumFractionDigits: 2 })}kg`
      : `${item.weight.toLocaleString('en-us', { minimumFractionDigits: 0 })}g`;
  }, [item.weight]);

  return (
    <div
      ref={ref}
      style={{ ...style, boxShadow: '0px 4px 28.5px rgba(0, 0, 0, 0.5)', backgroundColor: 'var(--theme-bg-secondary-highlight)' }}
      className="rounded-[11px] p-[8px] pr-[16px] flex flex-col gap-[8px] max-w-[380px]"
    >
      {/* Top row: Image + Info */}
      <div className="flex gap-[10px] items-start">
        {/* Item Image */}
        <div
          className="w-[56px] h-[56px] rounded-[8px] flex-shrink-0 bg-no-repeat bg-center"
          style={{
            backgroundColor: 'var(--theme-bg-main)',
            backgroundImage: `url(${getItemUrl(item)})`,
            backgroundSize: '70%',
          }}
        />

        {/* Info Column */}
        <div className="flex flex-col gap-[4px] flex-1 min-w-0">
          {/* Name + Rarity Badge */}
          <div className="flex items-center gap-[8px] flex-wrap">
            <p className="font-main text-[15px] italic leading-normal break-words" style={{ color: 'var(--theme-text-primary)' }}>
              {label}
            </p>
            {rarity && rarityColor && (
              <div
                className="shrink-0 flex items-center justify-center px-[5px] py-[1.5px] rounded-[5px]"
                style={{ backgroundColor: rarityColor }}
              >
                <p className="font-main text-[12px] leading-normal" style={{ color: 'var(--theme-text-primary)' }}>
                  {rarity.toUpperCase()}
                </p>
              </div>
            )}
          </div>

          {/* Weight or Duration */}
          <div className="flex items-center gap-[6px]">
            {inventoryType === 'crafting' ? (
              <>
                <ClockIcon />
                <p className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-muted)' }}>
                  {(item.duration !== undefined ? item.duration : 3000) / 1000}s
                </p>
              </>
            ) : weightDisplay ? (
              <p className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-muted)' }}>
                {weightDisplay}
              </p>
            ) : null}
            {item.metadata?.type && (
              <p className="font-main text-[13px] text-[rgba(222,222,222,0.5)] italic leading-normal">
                {item.metadata.type}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <ReactMarkdown className="font-main text-[13px] text-[rgba(222,222,222,0.8)] leading-relaxed">
          {description}
        </ReactMarkdown>
      )}

      {/* Metadata Section */}
      {inventoryType !== 'crafting' ? (
        <>
          {/* Pill badges row: durability, ammo, serial, ammo type */}
          {(item.durability !== undefined || item.metadata?.ammo !== undefined || item.metadata?.serial || ammoName) && (
            <div className="flex flex-wrap gap-[6px]">
              {item.durability !== undefined && (
                <div className="rounded-[7px] px-[10px] py-[4px] flex items-center gap-[5px]" style={{ backgroundColor: 'var(--theme-bg-main)', color: 'var(--theme-text-primary)' }}>
                  <DurabilityIcon />
                  <span className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-primary)' }}>{Math.trunc(item.durability)}</span>
                </div>
              )}
              {item.metadata?.ammo !== undefined && (
                <div className="rounded-[7px] px-[10px] py-[4px] flex items-center gap-[5px]" style={{ backgroundColor: 'var(--theme-bg-main)', color: 'var(--theme-text-primary)' }}>
                  <AmmoIcon />
                  <span className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-primary)' }}>{item.metadata.ammo}</span>
                </div>
              )}
              {item.metadata?.serial && (
                <div className="rounded-[7px] px-[10px] py-[4px] flex items-center gap-[5px]" style={{ backgroundColor: 'var(--theme-bg-main)', color: 'var(--theme-text-primary)' }}>
                  <FingerPrintIcon />
                  <span className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-primary)' }}>{item.metadata.serial}</span>
                </div>
              )}
              {ammoName && (
                <div className="rounded-[7px] px-[10px] py-[4px] flex items-center gap-[5px]" style={{ backgroundColor: 'var(--theme-bg-main)', color: 'var(--theme-text-primary)' }}>
                  <span className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-primary)' }}>
                    {Locale.ammo_type}: {ammoName}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Components */}
          {item.metadata?.components && item.metadata?.components[0] && (
            <div className="rounded-[7px] px-[10px] py-[4px]" style={{ backgroundColor: 'var(--theme-bg-main)' }}>
              <p className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-muted)' }}>
                {Locale.ui_components}: {(item.metadata.components as string[]).map((component: string, index: number, array: string[]) =>
                  index + 1 === array.length ? Items[component]?.label : (Items[component]?.label || component) + ', '
                )}
              </p>
            </div>
          )}

          {/* Weapon tint */}
          {item.metadata?.weapontint && (
            <div className="rounded-[7px] px-[10px] py-[4px]" style={{ backgroundColor: 'var(--theme-bg-main)' }}>
              <p className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-muted)' }}>
                {Locale.ui_tint}: {item.metadata.weapontint}
              </p>
            </div>
          )}

          {/* Additional metadata */}
          {additionalMetadata.map((data: { metadata: string; value: string }, index: number) => (
            <Fragment key={`metadata-${index}`}>
              {item.metadata && item.metadata[data.metadata] && (
                <div className="rounded-[7px] px-[10px] py-[4px]" style={{ backgroundColor: 'var(--theme-bg-main)' }}>
                  <p className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-muted)' }}>
                    {data.value}: {item.metadata[data.metadata]}
                  </p>
                </div>
              )}
            </Fragment>
          ))}
        </>
      ) : (
        /* Crafting ingredients */
        <>
          {ingredients && (
            <div className="flex flex-col gap-[4px]">
              {ingredients.map((ingredient) => {
                const [ingredientName, count] = [ingredient[0], ingredient[1]];
                return (
                  <div className="flex items-center gap-[8px] rounded-[7px] px-[10px] py-[4px]" style={{ backgroundColor: 'var(--theme-bg-main)', color: 'var(--theme-text-primary)' }} key={`ingredient-${ingredientName}`}>
                    <img
                      src={ingredientName ? getItemUrl(ingredientName) : 'none'}
                      alt="ingredient"
                      className="w-[20px] h-[20px] object-contain"
                    />
                    <p className="font-main text-[13px] italic leading-normal" style={{ color: 'var(--theme-text-muted)' }}>
                      {count >= 1
                        ? `${count}x ${Items[ingredientName]?.label || ingredientName}`
                        : count === 0
                        ? `${Items[ingredientName]?.label || ingredientName}`
                        : `${count * 100}% ${Items[ingredientName]?.label || ingredientName}`}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Double click to craft hint */}
          <div className="flex items-center gap-[8px] mt-1">
            <MouseClickIcon />
            <p style={{
              color: 'var(--theme-text-muted)',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              {Locale.ui_double_click_craft}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default React.forwardRef(SlotTooltip);
