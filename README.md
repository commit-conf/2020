The source code of Commit Conf 2020. This project contains the source code of a website based on [hugo](https://github.com/gohugoio) and [node-sass](https://github.com/sass/node-sass). 

```bash
# Install hugo
snap install hugo
# do not use apt-get - it has an old version of hugo

# Install node depenedencies
npm i

# Run the server. This does not write the hugo output to disk. 
npm run watch

# Launch the tests (build, run server and search for broken links)
npm run test

# Build the documentation and save the generated HTML and CSS into /public
npm run build
```

To deploy, we use the contents located on `/public`

```bash
# Deploy on GitHub Pages
bin/deploy
```

## Things you should know

### To publish small changes

If you only want to do small changes on the website, you have 3 ways to do it:

- Modify the [i18n](i18n) files. Most of the texts are from this file. Just search for the text you want to change and update it.

- Modify the [data](data) files. In this directory you have a lot of YAML files. You can change the order of some menu elements, add i18n entries to the terms and conditions, add job offers.

- Modify the [config.toml](config.toml) file. Here you can change the `Params` section, where you define the links for C4P, Agenda, photos, videos, etc. You have more info in this file, but remember to read the documentation of the file before updating anything.

### Data files

The [data](data) directory has lots of files. Here you will see each one goal:

- [menu.yaml](data/menu.yaml): Links used for the topbar of the site. Additionally, we will always add a language link and the link for agenda (if it is specified at [config.toml](config.toml)).

- [footer.yaml](data/footer.yaml): Here we specify the first footer links. If one link name should not be translated, you must specify a `i18n: false` entry in the item. Usually, links will just work (I mean, it doesn't matter if it is a relative link or an absolute link). If an external link does not work (for example, "mailto" links), add an `absolute: true` entry.

- [location.yaml](data/location.yaml): Here you have the i18n entries we will use to create the location page. `title` and `content` keys specify i18n entries to use. **Advanced**: If you need to include a very complex HTML, you can specify a `template` key and the path to a partial file.

- [tickets.yaml](data/tickets.yaml): It works like the location file, but this is for the tickets page.

- [terms.yaml](data/terms.yaml): i18n entries to use in the Terms and Conditions page.

- [stats.yaml](data/stats.yaml): The stats to show on the homepage. As always, the `name` is a key of the i18n files.

- [communities.yaml](communities.yaml): Communities list. Logos must be uploaded to [static/img/communities/original]. In this file you must specify, for each community:
  - `name`: Required. The name of the community
  - `href`: Required. The homepage of the community
  - `logo`: Optional. If no logo entry is specified, we will assume there is a png logo with the file name extracted from the community name. For example, if the community name is "Otaku Lovers", we will assume the community logo filename is "otaku-lovers.png". 
    - `type`: Optional. To search using the default filename but with different file type ('svg' or 'jpg', for example). 
    - `file`: Optional. To specify the full logo filename here (with extension).

- [sponsors.yaml](data/sponsors.yaml): Like the communities file, but for sponsors and inside categories. This time the logos must be inside [static/img/sponsors/original](static/img/sponsors/original). You only need to wrap the same communities behaviour and syntax inside each category:
  - `name`: Required. The category name (Gold, Silver, etc).
  - `items`: Required. List of sponsors inside this category (following the same structure of the communities file)

- [jobs.yaml](data/jobs.yaml): Jobs of the sponsors. For each list item, you need to specify:
  - `sponsor`: Required. The same sponsor name as in [data/sponsors.yaml](sponsors.yaml) file.
  - `title`: Required. The job role.
  - `salary`: Required. The salary range. Example: 10K-18K
  - `location`: Required. The location. Example: Madrid, Spain
  - `tags`: Required. A list of tags to describe the job offer. Example: [senior, Java, TDD, Scrum, Devops]
  - `template`: Required. The markdown file with the job offer content. This file should be inside the [src/jobs](src/jobs) folder. Example: commit/senior-otaku-lover.md

- [c4v.yaml](data/c4v.yaml): Content of the call for volunteers page. Just follow the pattern of the file.

- [team.yaml](data/team.yaml): Content of the team page.

- FYI: In the [404 page](layouts/404.html) we show a random entry of the [helloworld.json](data/helloworld.json) file. Maybe you want to add more womens entries.

### Prepared updates

#### C4P

Once you want to publish the C4P, just fill the `C4PLink` of the [config.toml](config.toml) file. It will show a button on the homepage and change the style of the tickets button.

#### Agenda

Just update the `AgendaLink` of the [config.toml](config.toml) file. It will:
  - Add a link on the topbar menu.
  - Add a button on the homepage and change the style of the tickets button.
  - It will hide the C4P button if the `C4PLink` is still specified.

#### Sponsors

If there are no sponsors in the YAML file, it will show no current sponsors section in the sponsors page. 

We will show a small section in the homepage. This section will show the list of sponsors (independently of the category, all with the same size) once we reach 4 sponsors (of any type, except collaborators). You can change this limit at [config.toml](config.toml).

#### Job offers

We will show no link anywhere until we have something in the YAML file. Once we have it, we will show a section in the sponsors page to link to the job offers page.

#### Call for volunteers

You only need to specify the `C4VLink` at [config.toml](config.toml). We will publish a button in the homepage with a link to the C4V page. To unpublish, just remove the `C4PLink` value.

#### Streaming

If you want to publish a streaming button in the homepage, just specify the `StreamingLink` at [config.toml](config.toml). To unpublish, just remove its value.

#### Photos and summary video

After the event, you will want to publish the summary video and the photos links. Just specify `VideoLink` and/or `PhotosLink` at [config.toml](config.toml). Specifying any of them will remove the Tickets button of the homepage and add buttons for this links.

#### Diversity tickets

We have a section to specify how the diversity tickets works. You can specify two things at [config.toml](config.toml):
  - `DiversityTicketsLink`: Link to the form to sign up for the diversity tickets. This link will be shown once it is specified, with the i18n entry `DiversityTicketsDeadline` to specify the deadline date.
  - `DiversityTicketsClosedKey`: A i18n entry to use when there is no DiversityTicketsLink. Just because registration is not open or because it is closed.

#### Announcements

If you want to announce something (the agenda publish dates, next Commit edition dates, whatever) you can specify a i18n entry in `AnnouncementKey` at [config.toml](config.toml).
