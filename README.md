# wri-starter-kit
Starter code for wri sites

Based off of https://github.com/pantheon-systems/example-drops-8-composer with some updates to make this install with the wri/wri_sites https://github.com/wri/wri_sites profile.

## To build a new site
1. Make sure you have all the prerequisites to use the Pantheon build tools, as discussed at https://pantheon.io/docs/guides/build-tools/create-project/#prerequisites

Note that includes each of the following:
- Composer version 2+
- terminus version 3+
- An SSH key on Pantheon's Dashboard (so you can run terminus commands without having to provide a password)
- The terminus build tools plugin

You should also have:
- The ability to create a new repository on Github under the WRI org: https://github.com/organizations/wri/repositories/new
- The ability to create a new Site on Pantheon under the WRI org (on your Pantheon dashboard, use the top-left icon to go to the WRI org and then look for the "Create New Site" button)

2. Make sure you're running composer version 2: `composer self-update --2`, then run this command:
   ```
   COMPOSER_MEMORY_LIMIT=-1 terminus build:project:create --team='8d0668c5-17bd-17c8-6fd2-1e81cddff66f' --org='wri' --visibility='private' --stability='dev'  wri/wri-starter-kit [new-project-name]
   ```

   More info about the build tools and what each section means is available at https://github.com/pantheon-systems/terminus-build-tools-plugin/blob/master/README.md#buildprojectcreate

   If you run into a memory exhausted error jump down to the "What to do if the build:project command fails - Manual create" section.

3. Enable solr on your new site:

   ```
   terminus solr:enable [new-project-name]
   ```

4. You can now visit your github repo at https://github.com/wri/[new-project-name]. That repository will have information on the Pantheon multidev and Circleci configuration in its README.md

## Post-install recommended configuration changes:

After initial install, we recommend doing the following:

1. Enable solr: `terminus solr:enable [your-site-name]` -- or you can do this using the Pantheon Dashboard.
2. Pull your site from dev -> test -> live so you can start making configuration changes without fear of losing them with new deploys.
3. On live, create a homepage `/node/add/homepage`
4. On live, create the Site title, etc at `/admin/config/system/site-information` including linking to the homepage you just created.
5. On live, add Topics, Types and Region terms to the taxonomy (or pull via a migration).
6. On live, enable the publishing workflow for all content types at `/admin/config/workflow/workflows/manage/content_publishing`
7. On live, set up any Languages you'll want to use on the site. The documentation: https://www.drupal.org/docs/multilingual-guide


### What to do if the build:project command fails:
1. Start by trying to delete the site: https://github.com/wri/wri-starter-kit#how-to-delete-a-project-made-with-this-starter-kit
2. If that fails, delete the github repo and the pantheon environment manually.
3. Fix the problems that caused the site to fail to build
4. Re-run the `terminus build:project:create`

#### Manual Create:
If the automated tooling hits a memory exhausted error during the profile install we will need to install / wrap up wiring up the build tools by hand.

(These steps assume you already ran `COMPOSER_MEMORY_LIMIT=-1 terminus build:project:create --team='World Resources Institute' --org='wri' --visibility='private' --stability='dev' wri/wri-starter-kit [new-project-name]` and haven't run / changed anything yet.)

##### Building the codebase
1. On your local run `COMPOSER_MEMORY_LIMIT=-1 composer create-project wri/wri-starter-kit [new-project-name]`
   1. This will build out the project on your local (Minus profile install)
2. Run `cd [new-project-name]`
3. Skip this step if not using docksal
   1. Copy the `.docksal/` directory from https://github.com/wri/wriflagship and paste it in the project.
   2. Run `fin init`
4. Now run (add `fin if using docksal`): `drush site-install wri_sites --account-mail='<site-email>' --account-name=<admin-account-username> --account-pass="<admin-password" --site-mail='<site-email>' --site-name=<new-project-name> --yes`
5. Now export out the database

###### Setting up the database
1. Log into Pantheon and navigate to your new site
2. Under the `Dev` tab go to `Database / File` --> `Import`
3. Import your database you exported in the last section

##### CI Tooling (CircleCi)
1. Go to: https://app.circleci.com/projects/project-dashboard/github/wri/
2. Look for your new site and click on it
3. Verify there are no errors, If there are such as "branch not found" fix them.

##### Final Steps:
1. In github navigate to your new Site's repo
2. Clone it next to your new project directory. (You will need to rename one of the directories to avoid conflict, or in a different place)
3. Once cloned copy the `.git` directory from the freshly cloned repo and paste it in your project directory we created earlier. This will be your new working git directory for the project. (this is just quick way to get all the generated files into a directory that git knows about)
4. If everything look correct make a commit and push up to the repo.
5. In github, circle ci, and pantheon verify all of our pipelines are working. A build should be triggered from this push.

### How to delete a project made with this starter kit.

[The Pantheon Build tools](https://github.com/pantheon-systems/terminus-build-tools-plugin) provides an [build:env:obliterate](https://github.com/pantheon-systems/terminus-build-tools-plugin#buildenvobliterate) command to delete a site that was spun up using the `build:project:create` command. It will delete both the Pantheon site and the repo, so any changes you've made either place will be lost forever. Example:

```
terminus build:env:obliterate [new-project-name]
```
