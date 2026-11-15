import {LocalizedHome, homeMetadata} from '@/components/LocalizedHome';

export const metadata = homeMetadata('pt');
export default function Page() {
 return <LocalizedHome locale="pt"/>;
}
