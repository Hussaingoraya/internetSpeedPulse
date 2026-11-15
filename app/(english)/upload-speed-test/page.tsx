import {SpecializedTest,specializedMetadata} from '@/components/SpecializedTest';

export const metadata=specializedMetadata('upload-speed-test');
export default function Page() {
 return <SpecializedTest slug="upload-speed-test"/>;
}
