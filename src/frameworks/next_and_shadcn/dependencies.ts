const axiosVersion = '^1.7.9';
const hookformResolversVersion = '^3.10.0';
const radixUiReactAvatarVersion = '^1.1.3';
const radixUiReactCollapsibleVersion = '^1.1.3';
const radixUiReactDialogVersion = '^1.1.6';
const radixUiReactDropdownMenuVersion = '^2.1.6';
const radixUiReactLabelVersion = '^2.1.2';
const radixUiReactSeparatorVersion = '^1.1.2';
const radixUiReactSlotVersion = '^1.1.2';
const radixUiReactTooltipVersion = '^1.1.8';
const reactHookFormVersion = '^7.54.2';
const reactQueryDevtoolsVersion = '^5.66.0';
const reactQueryVersion = '^5.66.0';
const reactSelectVersion = '^5.10.0';
const zodVersion = '^3.24.2';

const tailwindcssPostcssVersion = '^4.0.9';
const tailwindcssTypographyVersion = '^0.5.16';
const postcssVersion = '^8.5.3';
const tailwindcssVersion = '^4.0.9';


export function getDependenciesVersionsToInstall() {
  return {
    '@hookform/resolvers': hookformResolversVersion,
    '@radix-ui/react-avatar': radixUiReactAvatarVersion,
    '@radix-ui/react-collapsible': radixUiReactCollapsibleVersion,
    '@radix-ui/react-dialog': radixUiReactDialogVersion,
    '@radix-ui/react-dropdownmenu': radixUiReactDropdownMenuVersion,
    '@radix-ui/react-label': radixUiReactLabelVersion,
    '@radix-ui/react-separator': radixUiReactSeparatorVersion,
    '@radix-ui/react-slot': radixUiReactSlotVersion,
    '@radix-ui/react-tooltip': radixUiReactTooltipVersion,
    '@tanstack/react-query': reactQueryVersion,
    '@tanstack/react-query-devtools': reactQueryDevtoolsVersion,
    axios: axiosVersion,
    'react-hook-form': reactHookFormVersion,
    'react-select': reactSelectVersion,
    zod: zodVersion,
  };
}

export function getDevDependenciesVersionsToInstall() {
  return {
    "@tailwindcss/postcss": tailwindcssPostcssVersion,
    "@tailwindcss/typography": tailwindcssTypographyVersion,
    "postcss": postcssVersion,
    "tailwindcss": tailwindcssVersion,
  };
}
