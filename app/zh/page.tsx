import {LocalizedHome, homeMetadata} from '@/components/LocalizedHome';

export const metadata = homeMetadata('zh');
export default function Page() {
 return <LocalizedHome locale="zh"/>;
}
