import {SpecializedTest,specializedMetadata} from '@/components/SpecializedTest';

export const metadata=specializedMetadata('ping-test');
export default function Page() {
 return <SpecializedTest slug="ping-test"/>;
}
