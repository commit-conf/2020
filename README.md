The source code of Commit Conf 2020. This project contains the source code of a website based on [hugo](https://github.com/gohugoio) and sass. 

```bash
# Install hugo -- do not use apt-get, that's an old version 
snap install hugo --channel=extended

# Install node depenedencies
npm i

# Run the server. This does not write the hugo output to disk. 
npm run watch

# Launch the tests (build, run server and search for broken links)
npm run test

# Build the documentation and save the generated HTML and CSS into /public
npm run build

# Deploy on GitHub Pages
bin/deploy
```

## To publish small changes

There are three main locations to visit in order to make changes on the website:

- [i18n folder](i18n) contains most of the text contents of the website, just search for the entry you are interested in, and modify it.

- [data folder](data) contains several YAML files with the menu elements, i18n entries from the terms and conditions, and job offers.

- [config.toml](config.toml), which sets the links for C4P, Agenda, photos, videos, etc (look for the `Params` section). Remember to read the documentation on the file before updating anything.

## Data files

The [data folder](data) holds several files:

- [menu.yaml](data/menu.yaml): Links used for the top bar of the site. Additionally, it includes a link to change the language and another to the agenda (if a value was specified in [config.toml](config.toml)).

- [footer.yaml](data/footer.yaml): links in the footer. Set a `i18n: false` attribute to not translate the text contents. It doesn't matter if it is a relative or absolute link. Add an `absolute: true` entry if you find an external link that does not work (for example, with `mailto:` links), .

- [location.yaml](data/location.yaml): the i18n entries we use to create the location page. `title` and `content` keys specify i18n entries to use. **Advanced**: If you need to include a very complex HTML, you can specify a `template` key and the path to a partial file.

- [tickets.yaml](data/tickets.yaml): like `location.yaml`, but for the tickets page.

- [terms.yaml](data/terms.yaml): i18n entries to use in the Terms and Conditions page.

- [stats.yaml](data/stats.yaml): The stats to show on the homepage. `name` is a key to use with the i18n files.

- [communities.yaml](communities.yaml): Communities list. The logos must be saved to [static/img/communities/original]. For each community you must specify:
  - `name`: The name of the community (required)
  - `href`: The homepage of the community (required)
  - `logo`: If no logo entry is specified, we assume there is a jpg logo with the (lowercase, dasherized) community name. For example, if the community name is "Otaku Lovers", we assume the community logo filename is "otaku-lovers.jpg" (optional)
    - `type`: Use this attribute to search for the filename with a different file type, like 'svg' (optional)
    - `file`: To specify the full logo filename including the extension (optional)

- [sponsors.yaml](data/sponsors.yaml): Like the communities file, but for sponsors and their categories. The logos must be saved to [static/img/sponsors/original](static/img/sponsors/original). 
  - `name`: The category name, like Gold or Silver (required)
  - `items`: List of sponsors inside this category, following the same structure of `communities.yaml` (required)

- [jobs.yaml](data/jobs.yaml): Job offers of the sponsors. For each list item, you need to specify:
  - `sponsor`: Required. The sponsor name as defined in [data/sponsors.yaml](sponsors.yaml) file.
  - `title`: Required. The job role.
  - `salary`: Required. The salary range. Example: 10K-18K
  - `location`: Required. The location. Example: Madrid, Spain
  - `tags`: Required. A list of tags to describe the job offer. Example: [senior, Java, TDD, Scrum, Devops]
  - `template`: Required. The markdown file with the job offer content. This file should be inside the [src/jobs](src/jobs) folder. Example: commit/senior-otaku-lover.md

- [c4v.yaml](data/c4v.yaml): Content of the Call for Volunteers page. Just follow the pattern on the file.

- [team.yaml](data/team.yaml): Content of the team page.

- FYI: On the [404' page](layouts/404.html) we show a random entry from [helloworld.json](data/helloworld.json) file. Maybe you want to add more entries.

## Updating contents

### C4P

To publish the C4P, just fill in the `C4PLink` in [config.toml](config.toml). The homepage will display a button and change the style of the tickets button.

### Agenda

Just update the `AgendaLink` in [config.toml](config.toml) to:

  - Add a link to the top bar menu.
  - Add a button on the homepage and change the style of the tickets button.
  - Hide the C4P button if `C4PLink` is still specified.

### Sponsors

The sponsors section will be empty, both on the home and the sponsors page, if the number of sponsors in `sponsors.yaml` is below the value defined for `minSponsorsCountForHome` in [config.toml](config.toml).

### Job offers

The jobs section in the sponsors page will be hidden if there are no job offers defined.

#### Call for volunteers

You only need to specify the `C4VLink` at [config.toml](config.toml). We publish a button on the homepage with a link to the C4V page. To unpublish, just remove the `C4PLink` value.

#### Streaming

If you want to publish a streaming button on the homepage, just specify the `StreamingLink` at [config.toml](config.toml). To unpublish, just remove its value.

#### Photos and summary video

After the event, you want to publish the summary video and the photos links. Just specify `VideoLink` and/or `PhotosLink` at [config.toml](config.toml). Specifying any of them, remove the Tickets button of the homepage, and add buttons for these links.

#### Diversity tickets

We have a section to specify how the diversity tickets work. You can specify two things at [config.toml](config.toml):
  - `DiversityTicketsLink`: Link to the form to sign up for the diversity tickets. We show this link once it is specified with the i18n entry `DiversityTicketsDeadline` to specify the deadline date.
  - `DiversityTicketsClosedKey`: A i18n entry to use when there is no DiversityTicketsLink. Just because registration is not open or because it is closed.

#### Announcements

If you want to announce something (the agenda publish dates, next Commit edition dates, whatever), you can specify an i18n entry in `AnnouncementKey` at [config.toml](config.toml).
