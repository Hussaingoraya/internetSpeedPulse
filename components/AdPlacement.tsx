// Deliberately dormant: enable only after an approved ad unit and certified CMP
// have been configured and tested. No ad requests or empty space are created.
export default function AdPlacement({location}:{location:'home-editorial'|'article-end'}) {
 return <aside hidden className="ad-placement" data-ad-location={location} aria-label="Advertisement"/>;
}
