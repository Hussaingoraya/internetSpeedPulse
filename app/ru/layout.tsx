import {LocalizedLayout,sharedMetadata} from '@/components/LocalizedLayout';

export const metadata=sharedMetadata;
export default function Layout({children}: {children: React.ReactNode}) {
 return <LocalizedLayout locale="ru">{children}</LocalizedLayout>;
}
