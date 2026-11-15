import {LocalizedHome, homeMetadata} from '@/components/LocalizedHome';

export const metadata = homeMetadata('fr');
export default function Page() {
 return <LocalizedHome locale="fr"/>;
}
