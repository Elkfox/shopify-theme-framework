import '../../styles/password.scss';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';
import {cookieTest} from '@elkfox/shopify-theme/scripts/cookies';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Detect cookie support
cookieTest('no-cookies', 'cookies');
