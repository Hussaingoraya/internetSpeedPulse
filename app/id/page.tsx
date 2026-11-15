import {LocalizedHome, homeMetadata} from '@/components/LocalizedHome';

export const metadata = homeMetadata('id');
export default function Page() {
 return <LocalizedHome locale="id"/>;
}
