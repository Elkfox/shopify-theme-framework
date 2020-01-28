import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';
import {cookieTest} from '@elkfox/shopify-theme/scripts/cookies';
import {responsiveVideos} from '@elkfox/shopify-theme/scripts/responsive-videos';
import {responsiveTables} from '@elkfox/shopify-theme/scripts/responsive-tables';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Detect cookie support
cookieTest('no-cookies', 'cookies');

// Responsive tables & RTE videos
responsiveVideos();
responsiveTables();
