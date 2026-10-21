# SIDEWALK

A responsive, English-language streetwear storefront built with semantic HTML, custom CSS and vanilla JavaScript. Its dark, neon-accented look takes cues from retro city nights and underground streetwear. It is an original interpretation of the shopping website reference, designed for the MTM6201 midterm assignment.

## Pages

- `index.html` — streetwear campaign homepage and Drop 01 collection
- `shop.html` — product grid, category filters and price sorting
- `product.html` — product details, colour selection, quantity control and persistent demo bag count
- `story.html` — brand point of view

## Run locally

Open `index.html` in a browser. The site has no build step or framework. Streetwear photography is delivered by Unsplash Images with width-based `srcset` variants; Google Fonts supplies the display and body fonts. Those visual services need an internet connection. The demo bag count uses browser local storage. Newsletter signup displays an on-page confirmation and is not connected to a mailing list; checkout and payments are not implemented.

## Design reference and attribution

Original reference: [Shopping Website community file](https://www.figma.com/design/3REwPDMgW1eDTeexIGQOAI/Shopping-Website--Community-?node-id=2-2&p=f) Attribution link: [Figma Community — Shopping Website](https://www.figma.com/community/file/1135871952737326157/shopping-website).

The included [mockup](images/mockup.svg) is the project’s design board, created for this implementation. The site is an original design and does not copy the reference’s source code.

## Accessibility and responsive details

The pages use landmarks, a skip link, visible keyboard focus, descriptive image alternatives, labelled controls, `aria-live` feedback and a reduced-motion preference. Grid layouts adapt at smaller widths. Product images provide small and large width variants through `srcset` and browser-selected `sizes`; below-the-fold images are lazy-loaded.
