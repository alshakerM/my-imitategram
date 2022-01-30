import { useRouter } from 'next/router';

export function Route({
  paths,
  matcher,
  negativeMatcher,
  children = null,
  emptyValue = null,
}) {
  const router = useRouter();

  if (negativeMatcher?.(router.asPath)) {
    return emptyValue;
  }

  if (paths?.includes(router.pathname) || matcher?.(router.asPath)) {
    return children;
  } else {
    return emptyValue;
  }
}
