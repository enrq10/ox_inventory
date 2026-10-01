return {
    footer = '', -- "hud": show hud | "" : hide hud
    showCategories = true, -- show item filter categories row (All, Weapons, etc.)
    disableAllControls = false, -- true: disable all controls + block movement when inventory is open | false: ox_inventory default behavior
    showClothingTab = true, -- true: show clothing tab | false: hide clothing tab
    showLogo = false, -- true: show logo in header | false: show ESC button instead
    logoFile = 'assets/of_logo.png',

    categories = { -- {}: for empty categories
        {
            id = 'weapons',
            label = 'Weapons',
            items = {
                'weapon_battlerifle', 'weapon_snowlauncher', 'weapon_tecpistol', 'weapon_advancedrifle',
                'weapon_appistol', 'weapon_assaultrifle', 'weapon_assaultrifle_mk2', 'weapon_assaultshotgun',
                'weapon_assaultsmg', 'weapon_ball', 'weapon_bat', 'weapon_battleaxe', 'weapon_bottle',
                'weapon_bullpuprifle', 'weapon_bullpuprifle_mk2', 'weapon_bullpupshotgun', 'weapon_bzgas',
                'weapon_carbinerifle', 'weapon_carbinerifle_mk2', 'weapon_ceramicpistol', 'weapon_pistolxm3',
                'weapon_combatmg', 'weapon_combatmg_mk2', 'weapon_combatpdw', 'weapon_combatpistol',
                'weapon_combatshotgun', 'weapon_compactlauncher', 'weapon_compactrifle', 'weapon_crowbar',
                'weapon_dagger', 'weapon_dbshotgun', 'weapon_doubleaction', 'weapon_emplauncher',
                'weapon_fireextinguisher', 'weapon_firework', 'weapon_flare', 'weapon_flaregun',
                'weapon_flashlight', 'weapon_golfclub', 'weapon_grenade', 'weapon_grenadelauncher',
                'weapon_gusenberg', 'weapon_hammer', 'weapon_hatchet', 'weapon_heavyrifle',
                'weapon_hazardcan', 'weapon_metaldetector', 'weapon_hominglauncher', 'weapon_fertilizercan',
                'weapon_heavypistol', 'weapon_heavyshotgun', 'weapon_heavysniper', 'weapon_heavysniper_mk2',
                'weapon_knife', 'weapon_knuckle', 'weapon_machete', 'weapon_machinepistol',
                'weapon_marksmanpistol', 'weapon_marksmanrifle', 'weapon_marksmanrifle_mk2', 'weapon_mg',
                'weapon_minigun', 'weapon_microsmg', 'weapon_militaryrifle', 'weapon_minismg',
                'weapon_molotov', 'weapon_musket', 'weapon_navyrevolver', 'weapon_nightstick',
                'weapon_petrolcan', 'weapon_gadgetpistol', 'weapon_pipebomb', 'weapon_pistol',
                'weapon_pistol50', 'weapon_pistol_mk2', 'weapon_poolcue', 'weapon_candycane',
                'weapon_proxmine', 'weapon_pumpshotgun', 'weapon_pumpshotgun_mk2', 'weapon_railgun',
                'weapon_railgunxm3', 'weapon_raycarbine', 'weapon_raypistol', 'weapon_revolver',
                'weapon_revolver_mk2', 'weapon_rpg', 'weapon_sawnoffshotgun', 'weapon_smg',
                'weapon_smg_mk2', 'weapon_smokegrenade', 'weapon_sniperrifle', 'weapon_snowball',
                'weapon_snspistol', 'weapon_snspistol_mk2', 'weapon_specialcarbine', 'weapon_specialcarbine_mk2',
                'weapon_stickybomb', 'weapon_stone_hatchet', 'weapon_stungun', 'weapon_autoshotgun',
                'weapon_switchblade', 'weapon_vintagepistol', 'weapon_rayminigun', 'weapon_wrench',
                'weapon_precisionrifle', 'weapon_tacticalrifle', 'weapon_teargas', 'ammo-9', 'at_clip_extended_smg',
            }
        },
        {
            id = 'food',
            label = 'Food',
            items = {
                'testburger', 'burger', 'sprunk', 'mustard', 'water', 'wine',
                'grape', 'grapejuice', 'coffee', 'vodka', 'whiskey', 'beer', 'sandwich',
            }
        },
        {
            id = 'healing',
            label = 'Healing',
            items = {
                'bandage', 'firstaid', 'ifaks', 'painkillers',
            }
        },
        -- another new category here
        -- {
        --     id = 'test',
        --     label = 'Test',
        --     items = {
        --         'test',
        --     }
        -- },
    },
}
