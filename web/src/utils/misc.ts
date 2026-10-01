// Will return whether the current environment is in a regular browser

import { Inventory } from "../typings";

// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// Basic no operation function
export const noop = () => {};

export const isInventoryEmpty = ({ items }: Inventory): boolean =>  {
    if (!items || items.length === 0)
        return true
    
    for (let i = 0; i < items.length; i++) { 
        if ( items[i].name )
            return false
        
    }

    return true
}