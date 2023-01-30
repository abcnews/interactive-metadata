# interactive-metadata

An almost like-for-like re-implementation of the interactive/visual elements of Story Lab's 2015 collabortion with Will Ockenden, in which we explored and reported on a snapshot of his phone metadata.

## Stories

- [How your phone tracks your every move (16 August 2015)](https://www.abc.net.au/news/2015-08-16/metadata-retention-privacy-phone-will-ockenden/6694152)
- [Metadata quiz: Who has Will been talking to? (19 August 2015)](https://www.abc.net.au/news/2015-08-19/metadata-will-ockenden-contacts-quiz/6694234)
- [What reporter Will Ockenden's metadata reveals about his life (24 August 2015)](https://www.abc.net.au/news/2015-08-24/metadata-what-you-found-will-ockenden/6703626)

## Note

This is not the canonical resource for this project. The original implementation also includes the raw (un-transformed) data set, intermediary transforms and the scripts we wrote to perform those transforms and data analysis. It can be found in ABC's internal [Stash repository](https://stash.abc-dev.net.au/projects/NEWS/repos/interactive-metadata-explorer). The original stories also used a legacy article format (Narrative), whereas the 2023 update is based on Odyssey. This also necessitated an update to the build tools (grunt ➡ aunty) and embed mechanism (fragments ➡ mounts).

## Authors

- [Simon Elvery](mailto:elvery.simon@abc.net.au)
- [Colin Gourlay](mailto:gourlay.colin@abc.net.au)

Project generated from [aunty](https://github.com/abcnews/aunty)'s `svelte` project template.
