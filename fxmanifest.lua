fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'
name 'ox_inventory'
author 'Overextended'
version '2.47.9'
repository 'https://github.com/overextended/ox_inventory'
description 'Slot-based inventory with item metadata support'

dependencies {
    '/server:6116',
    '/onesync',
    'oxmysql',
    'ox_lib',
}

shared_script '@ox_lib/init.lua'

ox_libs {
    'locale',
    'table',
    'math',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'init.lua'
}

client_scripts {
  'init.lua',

  -- DPEMOTES
  'modules/clothing/Functions.lua',
  'modules/clothing/Locale/*.lua',
  'modules/clothing/Variations.lua',
  'modules/clothing/Config.lua',
  'modules/clothing/Clothing.lua',
}

ui_page 'web/build/index.html'
content_security_policy "default-src 'self'; img-src 'self' https://i.imgur.com https://*.imgur.com data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"

files {
    'client.lua',
    'server.lua',
    'config.lua',
    'locales/*.json',
    'web/build/index.html',
    'web/build/assets/*.js',
    'web/build/**/*.css',
    'web/build/assets/*.png',
    'web/build/assets/*.svg',
    'web/build/fonts/*.otf',
    'web/images/*.png',
    'modules/**/shared.lua',
    'modules/**/client.lua',
    'modules/bridge/**/client.lua',
    'data/*.lua',
}

escrow_ignore {
    '**/*'
}

dependency '/assetpacks'