# wri-starter-kit
Starter code for wri sites

Based off of https://github.com/pantheon-systems/example-drops-8-composer with some updates to make this install with the wri/wri_sites https://github.com/wri/wri_sites profile.

## To build a new site
1. Make sure you have all the prerequisites to use the Pantheon build tools, as discussed at https://pantheon.io/docs/guides/build-tools/create-project/#prerequisites

2. Run this command:
   ```
   COMPOSER_MEMORY_LIMIT=-1 terminus build:project:create --team='World Resources Institute' --org='wri' --visibility='private' --stability='dev' wri/wri-starter-kit [new-project-name]
   ```
   
   More info about the build tools and what each section means is available at https://github.com/pantheon-systems/terminus-build-tools-plugin/blob/master/README.md#buildprojectcreate
   
3. Enable solr on your new site:

   ```
   terminus solr:enable [new-project-name] 
   ```

4. You can now visit your github repo at https://github.com/wri/[new-project-name]. That repository will have information on the Pantheon multidev and Circleci configuration in its README.md

### What to do if the build:project command fails:

If the `build:project:create` command fails because of a composer conflict, you can try to debug this by running the simpler build command locally:

```yaml
composer create-project wri/wri-starter-kit [new-project-name]
```

If that fails as well, this repo needs to be updated.

If the build:project command fails for some reason, part of the skeleton for the new site might already exist. If it does, delete both the Pantheon environment and the github repo created, if either exist.

There is a lot of information about the build tools, which might help with debugging, in [The Pantheon Build tools README](https://github.com/pantheon-systems/terminus-build-tools-plugin). Pantheon also provides [thorough documentation](https://pantheon.io/docs/guides/build-tools) on the full scope of their build tools.

### How to delete a project made with this starter kit.

[The Pantheon Build tools](https://github.com/pantheon-systems/terminus-build-tools-plugin) provides an [build:env:obliterate](https://github.com/pantheon-systems/terminus-build-tools-plugin#buildenvobliterate) command to delete a site that was spun up using the `build:project:create` command. It will delete both the Pantheon site and the repo, so any changes you've made either place will be lost forever. Example:

```
terminus build:env:obliterate [new-project-name]
```
