import {LocalizedHome, homeMetadata} from '@/components/LocalizedHome';

export const metadata = homeMetadata('ja');
export default function Page() {
 return <LocalizedHome locale="ja"/>;
}
