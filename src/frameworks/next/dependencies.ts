const axiosVersion = '1.7.9';
const hookformResolversVersion = '3.10.0';
const reactHookFormVersion = '7.54.2';
const reactQueryDevtoolsVersion = '5.66.0';
const reactQueryVersion = '5.66.0';
const reactSelectVersion = '5.10.0';
const zodVersion = '3.24.2';

export function getDependenciesVersionsToInstall() {
  return {
    '@hookform/resolvers': hookformResolversVersion,
    '@tanstack/react-query': reactQueryVersion,
    '@tanstack/react-query-devtools': reactQueryDevtoolsVersion,
    axios: axiosVersion,
    'react-hook-form': reactHookFormVersion,
    'react-select': reactSelectVersion,
    zod: zodVersion,
  };
}
