import {LocalizedHome, homeMetadata} from '@/components/LocalizedHome';

export const metadata = homeMetadata('de');
export default function Page() {
 return <LocalizedHome locale="de"/>;
}
