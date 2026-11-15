import {LocalizedHome, homeMetadata} from '@/components/LocalizedHome';

export const metadata = homeMetadata('hi');
export default function Page() {
 return <LocalizedHome locale="hi"/>;
}
