import {LocalizedHome, homeMetadata} from '@/components/LocalizedHome';

export const metadata = homeMetadata('ru');
export default function Page() {
 return <LocalizedHome locale="ru"/>;
}
