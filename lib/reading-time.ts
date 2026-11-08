import {guideExamples} from './guide-examples';
import {guideReview} from './guide-review';

export function readingMinutes(article:{slug:string;sections:string[][]}) {
 const review=guideReview[article.slug],example=guideExamples[article.slug];
 const text=[...article.sections.flat(),...(review?[review.heading,review.note,...review.steps]:[]),...(example?[example.title,example.text]:[])].join(' ');
 return Math.max(1,Math.ceil(text.split(/\s+/).length/200));
}
